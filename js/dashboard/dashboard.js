export default
['$scope', '$rootScope', 
 '$location', 'auth', 'fire', 
 'userInfo', '$firebaseObject', 

function($scope, $rootScope, $location, auth, fire, userInfo, $firebaseObject) {
  
  let current_page = location.href.split('/'),
      user         = new Firebase(`${fire}/users/${userInfo.uid}`),
      user_obj     = $firebaseObject(user),
      userMessages = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`);
  
  
  user_obj.$loaded(function() {
    
    $scope.user = user_obj;
  });
  
  $scope.logOut = logOut;   
  $scope.setActivePage = setActivePage;
  $scope.activePage = current_page[current_page.length - 1];
  
  userMessages.on('child_changed', function(event) {
    
    console.debug('message change');  
    let item = event.val();
    let current_location = $location.path();
    
    if (item.newMessages === true && (current_location.indexOf(item.name)) === -1) {
      let messageIn = new Audio('../../sounds/sound_1.mp3');
      messageIn.play();
      toastr.error(`<b>${item.title}</b>, new message!`);
    }  
  })
  
  function logOut() {
    
    $rootScope.loading = true;
    auth.unauthUser();
    user.update({
      
      lastLoggedOut: (new Date()).getTime()
    })
    $rootScope.loading = false;
    $location.path('/auth');
  }
  
  function setActivePage(page) {
    
    $scope.activePage = page;
  }
}]