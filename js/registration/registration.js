export default
['$scope', '$rootScope', 'auth', 

function($scope, $rootScope, auth) {
  
  $scope.signUp = signUp;  
  
  function signUp() {
    
    $rootScope.loading = true;
    auth.registerUser({
      email: $scope.useremail,
      password: $scope.userpassword
    });
  }
}]