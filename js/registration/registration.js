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
      
      if (!data.uid) { 
        
        toastr.error(data);
        $rootScope.loading = false;
        $rootScope.$digest();
      } else {
        
        $rootScope.loading = false;
        toastr.success('Сongratulation, account created successfully, <b>Log in</b>!');
        $location.path('/auth');
        $rootScope.$digest();
      }
    })
  }
}]