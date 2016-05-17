export default
['$scope', '$rootScope', 'auth', '$location', 

function($scope, $rootScope, auth, $location) {
  
  $scope.signUp = signUp;  
  
  function signUp() {
    
    $rootScope.loading = true;
    auth.registerUser({
      email: $scope.useremail,
      password: $scope.userpassword
    })
    .then(function(data) {
      
      $rootScope.loading = false;
      $rootScope.$digest();
      if (data) { 
        toastr.error(data);
      } else {
        
        $location.path('/auth');
      }
    })
  }
}]