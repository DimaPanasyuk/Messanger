export default
['$scope', 
 '$rootScope', 
 '$firebaseArray',
 'userInfo', 
function($scope, $rootScope, $firebaseArray, userInfo) {
  
  $rootScope.loading = true;
  $scope.pageTitle = 'Your Dialogs page';
  let dialog_ref   = new Firebase(`https://dima-messanger.firebaseio.com/users/${userInfo.uid}/dialogs`), 
      dialogs      = $firebaseArray(dialog_ref);
      
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