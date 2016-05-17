export default
['urls', '$routeProvider', 
function(urls, $routeProvider) {
  
  $routeProvider
  
  .when('/', {
    
    templateUrl: urls.templates + 'dashboard/dashboard.html',
    controller: 'Dashboard',
    resolve: {
      
      currentAuth: ['auth', function(auth) {
        
        return auth.authentication.$requireAuth();
      }] 
    }
  })
}]