export default 
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
  .state('dashboard.usersinfo', {
    
    url: 'users/:id/info',
    parent: 'dashboard',
    templateUrl: urls.templates + 'dashboard.usersinfo/dashboard.usersinfo.html',
    controller: 'UsersInfo',
    resolve: {
      
      log: function() {
        
        console.debug('Routed to Users Info page');
      },
      
      infoAboutWatchedUser: ['$stateParams', function($stateParams) {
        
        return $stateParams.id;
      }],
      
      userInfo: ['auth', function(auth) {
        
        return auth.authentication.$getAuth();  
      }],
      
      currentAuth: ['auth', function(auth) {
        
        return auth.authentication.$requireAuth();
      }] 
    }
  })
}];