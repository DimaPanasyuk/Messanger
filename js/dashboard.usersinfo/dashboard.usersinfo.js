export default
['$scope', '$rootScope', 'userInfo',
 'fire', 'infoAboutWatchedUser',
 '$firebaseObject',

function($scope, $rootScope, userInfo, fire, 
  infoAboutWatchedUser, $firebaseObject) {
  
  $rootScope.loading = true;
  let user_ref = new Firebase(`${fire}/users/${infoAboutWatchedUser}`),
      user     = $firebaseObject(user_ref.child('info'));
  
  user.$loaded(function() {
    
    $scope.profile = user;
    $rootScope.loading = false;
  })
}]