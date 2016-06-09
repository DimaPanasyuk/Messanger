export default
['urls', '$stateProvider', function(urls, $stateProvider) {
  $stateProvider
  .state('dashboard', {
    url: '/',
    templateUrl: urls.templates + 'dashboard/dashboard.html',
    controller: 'Dashboard',
    resolve: {
      userInfo: ['auth', function(auth) {
        return auth.authentication.$getAuth();
      }],
      currentAuth: ['auth', function(auth) {
        return auth.authentication.$requireAuth();
      }]
    }
  });
}];
