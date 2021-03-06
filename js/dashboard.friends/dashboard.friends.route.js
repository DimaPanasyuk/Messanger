export default
['urls', '$stateProvider',
function(urls, $stateProvider) {
  $stateProvider
  .state('dashboard.friends', {

    url: 'friends',
    parent: 'dashboard',
    templateUrl: urls.templates + 'dashboard.friends/dashboard.friends.html',
    controller: 'Friends',
    resolve: {

      log: function() {
        console.debug('Routed to friends page');
      },

      userInfo: ['auth', function(auth) {
        return auth.authentication.$getAuth();
      }],

      currentAuth: ['auth', function(auth) {
        return auth.authentication.$requireAuth();
      }]
    }
  });
}];
