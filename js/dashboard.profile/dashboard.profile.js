export default
['$scope', '$rootScope', 'userInfo', '$timeout',
 'fire', '$firebaseObject', '$firebaseArray',
function($scope, $rootScope, userInfo, $timeout, fire, $firebaseObject, $firebaseArray) {
  $rootScope.subLoading = true;
  let profileRef = new Firebase(`${fire}/users/${userInfo.uid}/info`);
  let userRef = new Firebase(`${fire}/users/${userInfo.uid}`);
  let user = $firebaseObject(userRef);
  let userPhotos = $firebaseArray(new Firebase(`${fire}/users/${userInfo.uid}/info/photos`));
  let profile = $firebaseObject(profileRef);

  $scope.pageTitle = 'Your Profile page';

  $scope.profile = profile;
  $scope.phoneNumber = '';

  userPhotos.$loaded(function() {
    $scope.userPhotos = userPhotos;
  });
  profile.$loaded(function() {
    if (profile.name) {
      $scope.mode = 'view';
      document.getElementsByTagName('title')[0].innerHTML = `${profile.name} ${profile.surname}`;
      $scope.status = user.lastLoggedOut;
    } else {
      $scope.firstTime = true;
      $scope.mode = 'change';
      $scope.profile = {

        name: '',
        surname: '',
        about: '',
        tel: null,
        image: profile.image || '../../images/noavatar.jpg',
        country: '',
        region: '',
        city: '',
        skype: ''
      };
      document.getElementsByTagName('title')[0].innerHTML = `New Profile`;
    }

    $rootScope.subLoading = false;
  });

  $scope.addPhoneNumber = addPhoneNumber;
  $scope.removePhone = removePhone;
  $scope.saveProfileInfo = saveProfileInfo;
  $scope.dontSaveProfileInfo = dontSaveProfileInfo;
  $scope.changeMode = changeMode;
  $scope.uploadProfileImage = uploadProfileImage;
  $scope.addPhoto = addPhoto;
  $scope.showPhoto = showPhoto;
  $scope.removePhoto = removePhoto;

  function addPhoneNumber() {
    $scope.profile.numbers = $scope.profile.numbers || [];
    $scope.profile.numbers.push($scope.profile.phoneNumber);
    $scope.profile.phoneNumber = '';
  }

  function removePhone(index) {
    $scope.profile.numbers.splice(index, 1);
  }

  function saveProfileInfo() {
    let prof = $scope.profile;
    profileRef.update({

      name: prof.name,
      surname: prof.surname,
      about: prof.about || '',
      tel: prof.tel || '',
      country: prof.country || '',
      region: prof.region || '',
      city: prof.city || '',
      skype: prof.skype || '',
      image: prof.image || '../../images/noavatar.jpg'
    });
    $scope.mode = 'view';
    $scope.firstTime = false;
  }

  function dontSaveProfileInfo() {
    $scope.mode = 'view';
  }

  function changeMode(mode) {
    $scope.mode = mode;
  }

  function uploadProfileImage(img) {
    $scope.profile.image = img;
    angular.extend(profile, $scope.profile);
    profile.$save()
    .then(function() {
      $scope.imageLoaded = true;
    });
  }

  function addPhoto() {
    userPhotos.$add($scope.newPhoto)
    .then(function() {
      $scope.newPhoto = '';
    });
  }

  function showPhoto(photo) {
    $scope.shownPhoto = photo;
  }

  function removePhoto(photo) {
    userPhotos.$remove(photo)
    .then(function() {
      toastr.info('Image deleted successfully!');
    });
  }
}];
