export default
['$scope', '$rootScope', '$location', 'auth',

function($scope, $rootScope, $location, auth) {
  $scope.user = {
    email: ''
  };
  $scope.reset = reset;
  $scope.backToAuth = backToAuth;
  function reset() {
    $rootScope.loading = true;
    auth.resetUserPassword({
      email: $scope.user.email
    })
    .then(function(data) {
      if (data) {
        $rootScope.loading = false;
        toastr.error(data);
        $rootScope.$digest();
      } else {
        $rootScope.loading = false;
        toastr.success('Temporary password was send on your email!');
        $location.path('/auth');
        $rootScope.$digest();
      }
    });
  }
  function backToAuth() {
    $location.path('/auth');
  }
}];
