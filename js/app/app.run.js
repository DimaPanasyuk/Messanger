export default
['$rootScope', '$location', 
function($rootScope, $location) {
  
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    
    if (error === "AUTH_REQUIRED") {
      
      $location.path("/auth");
    }
  });
}]