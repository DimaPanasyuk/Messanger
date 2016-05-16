
App.$inject = [
  '$scope',
  '$firebaseObject',
  'auth'
];

function App($scope, $firebaseObject, auth) {
  
  let user = new Firebase('https://dima-messanger.firebaseio.com');
  $scope.user_info = $firebaseObject(user);
  
  $scope.title = 'App controller!';
  $scope.user = {
    
    email: '1@u.net',
    password: '123'
  };
  
  
  auth.authPassword({
    email: '1@u.net',
    password: '123'
  })
  .then(function(data) {
    
    console.debug(data);
  })
}

export default App;