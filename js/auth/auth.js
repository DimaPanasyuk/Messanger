export default
[
  '$scope', 
  '$rootScope', 
  '$location',
  '$timeout', 
  'auth', 

function Auth($scope, $rootScope, $location, $timeout, auth) {
  
  // $scope.useremail = '';
  // $scope.userpassword = '';
  $scope.logIn  = logIn;
  $scope.signUp = signUp;
  
  function logIn() {
    
    $rootScope.loading = true;
    auth.authUser({
      email: $scope.useremail,
      password: $scope.userpassword
    })
    .then(function(data) {
      $rootScope.loading = false;
      if(data && data.provider) {

        $location.path('/');
        $rootScope.$digest();
      } else {
        toastr.error(data);
        $rootScope.$digest();
      }
    })
  }
  
  function signUp() {
    
    $location.path('/signup');
  }
}]