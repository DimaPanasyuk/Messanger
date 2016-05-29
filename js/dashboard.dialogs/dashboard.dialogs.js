export default
['$scope', 
 '$rootScope', 
 '$firebaseArray',
 '$location',
 'userInfo',
 'fire', 
function($scope, $rootScope, $firebaseArray, $location, userInfo, fire) {
  
  $rootScope.subLoading = true;
  let dialog_ref   = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`), 
      dialogs      = $firebaseArray(dialog_ref);
      
  dialogs.$loaded(function() {
    
    $scope.dialogs        = dialogs;
    $rootScope.subLoading = false;
  });
  $scope.removeDialog        = removeDialog;
  $scope.openDialogMessages  = openDialogMessages;
  $scope.addNewDialog        = addNewDialog;
   
  
  function addNewDialog() {
    
    $location.path('/dialogs/new');
  } 
  
  function removeDialog(dialog) {
    
    dialogs.$remove(dialog);
  }  
  
  function openDialogMessages(dialog) {
    
    $location.path(`/dialogs/${dialog.name}/messages`);
  }
}]