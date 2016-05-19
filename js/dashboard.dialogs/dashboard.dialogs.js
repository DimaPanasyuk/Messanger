export default
['$scope', '$rootScope', '$firebaseArray', 
function($scope, $rootScope, $firebaseArray) {
  
  $scope.pageTitle = 'Your Dialogs page';
  let dialog_ref   = new Firebase('https://dima-messanger.firebaseio.com/dialogs'),
      dialogs_ref  = new Firebase('https://dima-messanger.firebaseio.com/dialogs-list'), 
      dialogs      = $firebaseArray(dialog_ref),
      dialogs_list = $firebaseArray(dialogs_ref);
  
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
    console.debug($scope.dialog);
    dialogs.$add($scope.dialog);
    $scope.dialog.title = '';
  } 
  
  function removeDialog(dialog) {
    
    dialogs.$remove(dialog);
    dialogs_list.$remove(dialog);
  }  
  
  function toggleNewDialogForm() {
    
    $scope.creatingNewDialog = !$scope.creatingNewDialog;
  }
}]