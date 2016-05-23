export default 
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
  .state('dashboard.dialogs', {
    
    url: 'dialogs',
    parent: 'dashboard',
    templateUrl: urls.templates + 'dashboard.dialogs/dashboard.dialogs.html',
    controller: 'Dialogs',
    resolve: {
      
      log: function() {
        
        console.debug('Routed to dialogs page');
      },
      userInfo: ['auth', function(auth) {
        
        
        return auth.authentication.$getAuth();  
      }],
      
      currentAuth: ['auth', function(auth) {
        
        return auth.authentication.$requireAuth();
      }] 
    }
  })
}];