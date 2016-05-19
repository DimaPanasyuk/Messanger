export default
['$scope', '$rootScope', '$firebaseArray', '$stateParams', 
function($scope, $rootScope, $firebaseArray, $stateParams) {
  
  let messages_ref = new Firebase(`https://dima-messanger.firebaseio.com/dialogs/${$stateParams.name}/messages`);
  let messages = $firebaseArray(messages_ref);
  
  $scope.dialogTitle = $stateParams.name.split('_').join(' ');
  $scope.messages = messages;
  $scope.sendMessage = sendMessage;

  $scope.message = {
    
    author: '',
    time: '',
    text: ''
  };
  $scope.message.author = localStorage.getItem('messageAuthor');
  
  function sendMessage() {
    
    $scope.message.time = (new Date()).getTime();
    messages.$add($scope.message);
    localStorage.setItem('messageAuthor', $scope.message.author);
    $scope.message.time = '';
    $scope.message.text = '';
  }
}]