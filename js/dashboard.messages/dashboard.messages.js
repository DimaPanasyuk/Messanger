export default
['$scope', '$rootScope', '$firebaseArray', '$stateParams', 
function($scope, $rootScope, $firebaseArray, $stateParams) {
  
  let messages_ref = new Firebase(`https://dima-messanger.firebaseio.com/dialogs-list/${$stateParams.name}/messages`);
  let messages = $firebaseArray(messages_ref);
  
  $scope.dialogTitle = $stateParams.name.split('_').join(' ');
  $scope.messages = messages;
  $scope.sendMessage = sendMessage;
  
  $scope.message = {
    
    author: '',
    time: '',
    text: ''
  };
  
  function sendMessage() {
    
    $scope.message.time = (new Date()).getTime();
    messages.$add($scope.message);
    $scope.message.time = '';
    $scope.message.text = '';
  }
}]