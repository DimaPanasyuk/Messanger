export default
['urls', '$routeProvider', 
function(urls, $routeProvider) {
  
  $routeProvider
  
  .when('/auth', {
    
    templateUrl: urls.templates + 'auth/auth.html',
    controller: 'Auth'
  })
}]