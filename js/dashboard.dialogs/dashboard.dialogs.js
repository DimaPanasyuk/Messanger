export default
['$scope', '$rootScope', '$firebaseArray', 
function($scope, $rootScope, $firebaseArray) {
  
  $rootScope.loading = true;
  $scope.pageTitle = 'Your Dialogs page';
  let dialog_ref   = new Firebase('https://dima-messanger.firebaseio.com/dialogs'),
      dialogs_ref  = new Firebase('https://dima-messanger.firebaseio.com/dialogs-list'), 
      dialogs      = $firebaseArray(dialog_ref),
      dialogs_list = $firebaseArray(dialogs_ref);
      
  dialogs.$loaded(function() {
    
    $rootScope.loading = false;
  })
  
  $scope.creatingNewDialog = false;
  $scope.dialog       = {
    title: ''
  };
  $scope.dialogs           = dialogs;
  $scope.addNewDialog      = addNewDialog;
  $scope.removeDialog      = removeDialog;
  $scope.toggleNewDialogForm = toggleNewDialogForm;
  
  
  function addNewDialog() {
    
    $scope.dialog.name = $scope.dialog.title.split(' ').join('_');
    dialog_ref.child($scope.dialog.name).set({
      
      title: $scope.dialog.title,
      name: $scope.dialog.name
    });
    $scope.dialog.title = '';
    $scope.dialog.name = '';
  } 
  
  function removeDialog(dialog) {
    
    dialogs.$remove(dialog);
    dialogs_list.$remove(dialog);
  }  
  
  function toggleNewDialogForm() {
    
    $scope.creatingNewDialog = !$scope.creatingNewDialog;
  }
}]