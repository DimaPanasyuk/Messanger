export default 
['urls', '$stateProvider', 
function(urls, $stateProvider) {
  
  $stateProvider
  .state('dashboard.messages', {
    
    url: 'dialogs/:name/messages',
    parent: 'dashboard',
    templateUrl: urls.templates + '/dashboard.messages/dashboard.messages.html',
    controller: 'Messages',
    resolve: {
      
      log: function() {
        
        console.debug('Routed to messages page');
      },
      currentAuth: ['auth', function(auth) {
        
        return auth.authentication.$requireAuth();
      }] 
    }
  })
}];