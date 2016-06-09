export default
['urls', '$stateProvider',
function(urls, $stateProvider) {
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: urls.templates + 'registration/registration.html',
    controller: 'Registration'
  });
}];
