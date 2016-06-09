export default
['urls', '$stateProvider',
function(urls, $stateProvider) {
  $stateProvider
  .state('dashboard.dialogSettings', {

    url: 'dialogs/:name/settings',
    parent: 'dashboard',
    templateUrl: urls.templates + 'dashboard.dialog.settings/dashboard.dialog.settings.html',
    controller: 'DialogSettings',
    resolve: {

      log: function() {
        console.debug('Routed to dialog settings page');
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
