export default 
['urls', '$routeProvider', 
function(urls, $routeProvider) {
  
  $routeProvider
    .when('/reset', {
      
      templateUrl: urls.templates + '/resetPassword/resetPassword.html',
      controller: 'ResetPassword'
    })
}]