export default
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
  
  .state('auth', {
    
    url: '/auth',
    templateUrl: urls.templates + 'auth/auth.html',
    controller: 'Auth'
  })
}]