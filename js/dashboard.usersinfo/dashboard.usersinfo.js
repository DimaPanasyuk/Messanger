export default
['$scope', '$rootScope', 'userInfo',
 'fire', 'infoAboutWatchedUser',
 '$firebaseObject',

function($scope, $rootScope, userInfo, fire, 
  infoAboutWatchedUser, $firebaseObject) {
  
  $rootScope.subLoading = true;
  let user_ref  = new Firebase(`${fire}/users/${infoAboutWatchedUser}`),
      user      = $firebaseObject(user_ref),
      user_info = $firebaseObject(user_ref.child('info'));
  
  user_info.$loaded(function() {
    
    $scope.user    = user;
    $scope.profile = user_info;
    $rootScope.subLoading = false;
  })
}]