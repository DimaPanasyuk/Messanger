export default
['$scope', '$rootScope', 'userInfo', 
 'fire', '$firebaseObject',
function($scope, $rootScope, userInfo, fire, $firebaseObject) {
  
  $rootScope.loading = true;
  let profile_ref = new Firebase(`${fire}/users/${userInfo.uid}/info`),
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
        numbers: [],
        image: profile.image || '../../images/noavatar.jpg',
        country: '',
        region: '',
        city: ''
      }
    } else {
      
      $scope.mode = 'view';
    }
    $rootScope.loading = false;
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
      numbers: prof.numbers || [],
      country: prof.country || '',
      region: prof.region || '',
      city: prof.city || '',
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