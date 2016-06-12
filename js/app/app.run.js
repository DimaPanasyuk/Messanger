export default
['$rootScope', '$location', '$timeout',
function($rootScope, $location, $timeout) {
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/auth");
    }
  });
  $rootScope.$on('$stateChangeStart', () => {
    $rootScope.loading = true;
  });
  $rootScope.$on('$stateChangeSuccess', () => {
    $timeout(() => {
      $rootScope.loading = false;
    }, 400);
  });
}];
