export default
['$scope', '$rootScope', '$location', 'auth',
 '$resource', 

function($scope, $rootScope, $location, auth, $resource) {
    
  $scope.logOut = logOut;
  
  function logOut() {
    
    $rootScope.loading = true;
    auth.unauthUser();
    $rootScope.loading = false;
    $location.path('/auth');
  }
}]