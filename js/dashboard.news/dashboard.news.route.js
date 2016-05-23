export default
['urls', '$stateProvider', function(urls, $stateProvider) {
  
  $stateProvider
    .state('dashboard.news', {
      
      url: 'news',
      parent: 'dashboard',
      templateUrl: urls.templates + 'dashboard.news/dashboard.news.html',
      controller: 'News',
      resolve: {
        
        log: function() {
          
          console.debug('Routed to news page');
        },
        currentAuth: ['auth', function(auth) {
        
          return auth.authentication.$requireAuth();
        }] 
      }
    })
}]