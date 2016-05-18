export default 
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
    .state('reset', {
      
      url: '/reset',
      templateUrl: urls.templates + '/resetPassword/resetPassword.html',
      controller: 'ResetPassword'
    })
}]