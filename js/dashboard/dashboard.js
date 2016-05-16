export default
['$scope', '$rootScope', '$location', 'auth', 

function($scope, $rootScope, $location, auth) {
  
  $scope.logOut = logOut;
  
  function logOut() {
    
    $rootScope.loading = true;
    auth.unauthUser();
    $rootScope.loading = false;
    $location.path('/auth');
  }
}]