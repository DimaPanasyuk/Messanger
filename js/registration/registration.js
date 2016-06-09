export default
['$scope', '$rootScope', 'auth', '$location',
function($scope, $rootScope, auth, $location) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.signUp = signUp;
  function signUp() {
    $rootScope.loading = true;
    auth.registerUser({
      email: $scope.user.email,
      password: $scope.user.password
    })
    .then(function(data) {
      if (data.uid) {
        $rootScope.loading = false;
        toastr.success('Сongratulation, account created successfully, <b>Log in</b>!');
        $location.path('/auth');
        $rootScope.$digest();
      } else {
        toastr.error(data);
        $rootScope.loading = false;
        $rootScope.$digest();
      }
    });
  }
}];
