export default
['$scope', '$rootScope', '$location', 'auth',  

function($scope, $rootScope, $location, auth) {
  
  $scope.reset = reset;
  $scope.backToAuth = backToAuth;
  
  
  function reset() {
    
    $rootScope.loading = true;
    auth.resetUserPassword({
      
      email: $scope.userEmail
    })
    .then(function(data) {
      if (data) {
        
        console.debug('Reset - ', data);
      } else {
        
        console.debug('Reset - no data');
        $rootScope.loading = false;
        $location.path('/auth');
        $rootScope.$digest();
      }
    })
  }
  
  function backToAuth() {
    
    $location.path('/auth');
  }  
  
}]