export default
['$scope', '$rootScope', '$location', 'auth',  

function($scope, $rootScope, $location, auth) {
  
  $scope.reset = reset;
  $scope.backToAuth = backToAuth;
  
  
  function reset() {
    
    auth.resetUserPassword({
      
      email: $scope.userEmail
    });
  }
  
  function backToAuth() {
    
    $location.path('/auth');
  }  
  
}]