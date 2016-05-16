export default
['urls', '$routeProvider', 
function(urls, $routeProvider) {
  
  $routeProvider
  
  .when('/signup', {
    
    templateUrl: urls.templates + 'registration/registration.html',
    controller: 'Registration'
  })
}]