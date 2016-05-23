export default
['$scope', '$rootScope', '$firebaseArray', '$stateParams', 
 '$timeout', '$interval', '$location', 'userInfo', 'fire', 
 '$firebaseObject',
function($scope, $rootScope, $firebaseArray, $stateParams, 
  $timeout, $interval, $location, userInfo, fire, $firebaseObject) {
  
  $rootScope.loading = true;
  let current_dialog = $firebaseObject(new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${$stateParams.name}`));
  let current_user   = $firebaseObject(new Firebase(`${fire}/users/${userInfo.uid}`));
  let messages_ref = new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${$stateParams.name}/messages`);
  let messages = $firebaseArray(messages_ref);
  
  messages.$loaded(function() {
    
    $rootScope.loading = false;
  });
  
  current_dialog.$loaded(function() {
    
    $scope.current_dialog = current_dialog;    
  })
  
  current_user.$loaded(function() {
   
    $scope.message = {
    
      author: current_user.info.name + ' ' + current_user.info.surname,
      time: '',
      text: ''
    };
  })
  
  $scope.currentDate = 1463754897700;
  
  $scope.dialogTitle = $stateParams.name.split('_').join(' ');
  $scope.messages    = messages;
  $scope.sendMessage = sendMessage;
  $scope.watchEnter  = watchEnter;
  
  function watchEnter(e) {
    
    if (e.keyCode === 13) {
      
      $timeout(function() {
        angular.element('#message_text').triggerHandler('click');
      }, 0);
    }
  }
  
  function sendMessage() {
    
    $scope.message.time = (new Date()).getTime();
    $scope.current_dialog.participants.forEach(function(participant) {

      let participant_messages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}/messages`));
      participant_messages.$add($scope.message);
    })
    $scope.message.time = '';
    $scope.message.text = '';
  }
}]