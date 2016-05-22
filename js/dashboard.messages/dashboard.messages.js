export default
['$scope', '$rootScope', '$firebaseArray', '$stateParams', 
 '$timeout', '$interval', '$location', 
function($scope, $rootScope, $firebaseArray, $stateParams, 
  $timeout, $interval, $location) {
  
  $rootScope.loading = true;
  let messages_ref = new Firebase(`https://dima-messanger.firebaseio.com/dialogs/${$stateParams.name}/messages`);
  let messages = $firebaseArray(messages_ref);
  messages.$loaded(function() {
    
    $rootScope.loading = false;
  })
  
  $scope.currentDate = 1463754897700;
  
  $scope.dialogTitle = $stateParams.name.split('_').join(' ');
  $scope.messages    = messages;
  $scope.sendMessage = sendMessage;
  $scope.watchEnter  = watchEnter;
  
  $scope.message = {
    
    author: '',
    time: '',
    text: ''
  };
  
  $scope.message.author = localStorage.getItem('messageAuthor');
  
  function watchEnter(e) {
    
    if (e.keyCode === 13) {
      
      $timeout(function() {
        angular.element('#message_text').triggerHandler('click');
      }, 0);
    }
  }
  
  function sendMessage() {
    
    $scope.message.time = (new Date()).getTime();
    messages.$add($scope.message);
    localStorage.setItem('messageAuthor', $scope.message.author);
    $scope.message.time = '';
    $scope.message.text = '';
  }
}]