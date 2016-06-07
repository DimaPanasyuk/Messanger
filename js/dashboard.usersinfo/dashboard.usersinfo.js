export default
['$scope', '$rootScope', 'userInfo',
 'fire', 'infoAboutWatchedUser',
 '$firebaseObject', '$firebaseArray',

function($scope, $rootScope, userInfo, fire, 
  infoAboutWatchedUser, $firebaseObject, $firebaseArray) {
  
  $rootScope.subLoading = true;
  let user_ref   = new Firebase(`${fire}/users/${infoAboutWatchedUser}`),
      user       = $firebaseObject(user_ref),
      userPhotos = $firebaseArray(new Firebase(`${fire}/users/${infoAboutWatchedUser}/info/photos`)),
      user_info  = $firebaseObject(user_ref.child('info'));
  
  user_info.$loaded(function() {
    
    $scope.user    = user;
    $scope.profile = user_info;
    $rootScope.subLoading = false;
       
    userPhotos.$loaded(function() {
      $scope.userPhotos = userPhotos;
    })
  });
  
  $scope.showPhoto = showPhoto;
  function showPhoto(photo) {
    $scope.shownPhoto = photo;
  }
}]