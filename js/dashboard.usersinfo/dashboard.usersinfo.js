export default
['$scope', '$rootScope', 'userInfo',
 'fire', 'infoAboutWatchedUser',
 '$firebaseObject', '$firebaseArray',

function($scope, $rootScope, userInfo, fire,
  infoAboutWatchedUser, $firebaseObject, $firebaseArray) {
  $rootScope.loading = true;
  let userRef = new Firebase(`${fire}/users/${infoAboutWatchedUser}`);
  let user = $firebaseObject(userRef);
  let userPhotos = $firebaseArray(new Firebase(`${fire}/users/${infoAboutWatchedUser}/info/photos`));
  let userInf = $firebaseObject(userRef.child('info'));

  userInf.$loaded(function() {
    $scope.user = user;
    $scope.profile = userInf;
    $rootScope.loading = false;

    userPhotos.$loaded(function() {
      $scope.userPhotos = userPhotos;
    });
  });

  $scope.showPhoto = showPhoto;
  function showPhoto(photo) {
    $scope.shownPhoto = photo;
  }
}];
