export default 
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
  .state('dashboard.profile', {
    
    url: 'profile',
    parent: 'dashboard',
    templateUrl: urls.templates + '/dashboard.profile/dashboard.profile.html',
    controller: 'Profile',
    resolve: {
      
      log: function() {
        
        console.debug('Routed to profile page');
      }
    }
  })
}];