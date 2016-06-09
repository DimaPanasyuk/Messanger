export default
['urls', '$stateProvider',
function(urls, $stateProvider) {
  $stateProvider
  .state('dashboard.users', {

    url: 'users',
    parent: 'dashboard',
    templateUrl: urls.templates + 'dashboard.users/dashboard.users.html',
    controller: 'Users',
    resolve: {

      log: function() {
        console.debug('Routed to users page');
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
