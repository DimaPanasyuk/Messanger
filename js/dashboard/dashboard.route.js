export default
['urls', '$routeProvider', 
function(urls, $routeProvider) {
  
  $routeProvider
  
  .when('/', {
    
    templateUrl: urls.templates + 'dashboard/dashboard.html',
    controller: 'Dashboard'
  })
}]