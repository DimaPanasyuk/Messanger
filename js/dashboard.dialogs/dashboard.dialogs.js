export default
['$scope',
 '$rootScope',
 '$firebaseArray',
 '$location',
 'userInfo',
 'fire',
function($scope, $rootScope, $firebaseArray, $location, userInfo, fire) {
  $rootScope.loading = true;
  let dialogRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`);
  let dialogs = $firebaseArray(dialogRef);

  dialogs.$loaded(function() {
    $scope.dialogs = dialogs;
    $rootScope.loading = false;
  });
  $scope.removeDialog = removeDialog;
  $scope.openDialogMessages = openDialogMessages;
  $scope.addNewDialog = addNewDialog;

  function addNewDialog() {
    $location.path('/dialogs/new');
  }

  function removeDialog(dialog) {
    dialogs.$remove(dialog);
  }

  function openDialogMessages(dialog) {
    $location.path(`/dialogs/${dialog.name}/messages`);
  }
}];
