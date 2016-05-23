export default
['$scope', 
 '$rootScope', 
 '$firebaseArray',
 'userInfo',
 'fire', 
function($scope, $rootScope, $firebaseArray, userInfo, fire) {
  
  $rootScope.loading = true;
  $scope.pageTitle = 'Your Dialogs page';
  let dialog_ref   = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`),
      friends_ref  = new Firebase(`${fire}/users/${userInfo.uid}/friends`), 
      dialogs      = $firebaseArray(dialog_ref),
      friends      = $firebaseArray(friends_ref);
      
  dialogs.$loaded(function() {
    
    $rootScope.loading = false;
    $scope.friends = friends;
  });
  
  $scope.creatingNewDialog = false;
  $scope.dialog       = {
    title: '',
    participants: [
      userInfo.uid
    ]
  };
  $scope.dialogs           = dialogs;
  $scope.addNewDialog      = addNewDialog;
  $scope.removeDialog      = removeDialog;
  $scope.toggleNewDialogForm = toggleNewDialogForm;
  
  
  function addNewDialog() {
    
    let participant_dialogs_ref =  new Firebase(`${fire}/users/${$scope.dialog.participants[1]}/dialogs`);
    
    
    $scope.dialog.name = $scope.dialog.title.split(' ').join('_');
    
    //Adding dialog for choosed user    
    participant_dialogs_ref.child($scope.dialog.name).set({
      
      title: $scope.dialog.title,
      name: $scope.dialog.name,
      participants: $scope.dialog.participants
    });
    
    //Adding dialog for current user
    dialog_ref.child($scope.dialog.name).set({
      
      title: $scope.dialog.title,
      name: $scope.dialog.name,
      participants: $scope.dialog.participants
    });
    
    $scope.dialog.title               = '';
    $scope.dialog.name                = '';
    $scope.dialog.participants.length = 1;
  } 
  
  function removeDialog(dialog) {
    
    dialogs.$remove(dialog);
    dialogs.$remove(dialog);
  }  
  
  function toggleNewDialogForm() {
    
    $scope.creatingNewDialog = !$scope.creatingNewDialog;
  }
}]