export default
['$scope',
 '$rootScope',
 '$location',
 '$timeout',
 'auth',
 'fire',

function Auth($scope, $rootScope, $location, $timeout, auth, fire) {
  // $scope.useremail = '';
  // $scope.userpassword = '';
  let users = new Firebase(fire + '/users');
  $scope.logIn = logIn;
  $scope.signUp = signUp;

  function logIn() {
    $rootScope.loading = true;
    auth.authUser({
      email: $scope.useremail,
      password: $scope.userpassword
    })
    .then(function(data) {
      $rootScope.loading = false;
      if (data && data.provider) {
        users.child(data.uid).update({
          id: data.uid,
          lastLoggedIn: (new Date()).getTime(),
          lastLoggedOut: 0
        });
        $location.path('/profile');
        $rootScope.$digest();
      } else {
        toastr.error(data);
        $rootScope.$digest();
      }
    });
  }

  function signUp() {
    $location.path('/signup');
  }
}];
