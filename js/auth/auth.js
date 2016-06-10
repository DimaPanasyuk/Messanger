export default
['$scope',
 '$rootScope',
 '$location',
 '$timeout',
 'auth',
 'fire',

function Auth($scope, $rootScope, $location, $timeout, auth, fire) {
  let users = new Firebase(fire + '/users');
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.logIn = logIn;
  $scope.signUp = signUp;

  function logIn() {
    $rootScope.loading = true;
    auth.authUser($scope.user)
    .then(function(data) {
      if (data && data.provider) {
        users.child(data.uid).update({
          id: data.uid,
          lastLoggedIn: (new Date()).getTime(),
          lastLoggedOut: 0
        });
        $location.path('/profile');
        $rootScope.$digest();
        $timeout(function() {
          $rootScope.loading = false;
        }, 200);
      } else {
        toastr.error(data);
        $rootScope.loading = false;
        $rootScope.$digest();
      }
    });
  }

  function signUp() {
    $location.path('/signup');
  }
}];
