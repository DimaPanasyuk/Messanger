export default
[
  '$scope', 
  '$rootScope', 
  '$location',
  '$timeout', 
  'auth', 

function Auth($scope, $rootScope, $location, $timeout, auth) {
  
  $scope.logIn  = logIn;
  $scope.signUp = signUp;
  
  function logIn() {
    
    $rootScope.loading = true;
    auth.authUser({
      email: $scope.useremail,
      password: $scope.userpassword
    });
    $timeout(function() {
      
      $location.path('/');
    }, 400);
  }
  
  function signUp() {
    
    $location.path('/signup');
  }
}]