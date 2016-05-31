export default
['$scope', '$rootScope', 'userInfo', 
 'fire', '$firebaseObject',
function($scope, $rootScope, userInfo, fire, $firebaseObject) {
  
  $rootScope.subLoading = true;
  let profile_ref = new Firebase(`${fire}/users/${userInfo.uid}/info`),
      user_ref    = new Firebase(`${fire}/users/${userInfo.uid}`),
      user        = $firebaseObject(user_ref),
      profile     = $firebaseObject(profile_ref);
  $scope.pageTitle = 'Your Profile page';
  
  $scope.profile = profile;
  $scope.phoneNumber = '';
  profile.$loaded(function() {
    
    if(!profile.name) {
    
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
      }
      document.getElementsByTagName('title')[0].innerHTML = `New Profile`;
    } else {
      
      $scope.mode = 'view';
      document.getElementsByTagName('title')[0].innerHTML = `${profile.name} ${profile.surname}`;
      $scope.status = user.lastLoggedOut;
    }
    
    $rootScope.subLoading = false;
  })
  
  
  $scope.addPhoneNumber      = addPhoneNumber;
  $scope.removePhone         = removePhone;
  $scope.saveProfileInfo     = saveProfileInfo;
  $scope.dontSaveProfileInfo = dontSaveProfileInfo;
  $scope.changeMode          = changeMode;
  $scope.uploadProfileImage  = uploadProfileImage;
  
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
    profile_ref.update({
      
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
    })
  }
}]