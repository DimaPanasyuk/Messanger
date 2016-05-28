export default 
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
  .state('dashboard.newDialog', {
    
    url: 'dialogs/new',
    parent: 'dashboard',
    templateUrl: urls.templates + 'dashboard.dialog.new/dashboard.dialog.new.html',
    controller: 'DialogNew',
    resolve: {
      
      log: function() {
        
        console.debug('Routed to new dialog page');
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