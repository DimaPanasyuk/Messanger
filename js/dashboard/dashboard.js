export default
['$scope', '$rootScope',
 '$location', 'auth', 'fire',
 'userInfo', '$firebaseObject',

function($scope, $rootScope, $location, auth, fire, userInfo, $firebaseObject) {
  $rootScope.loading = true;
  let currentPage = location.href.split('/');
  let user = new Firebase(`${fire}/users/${userInfo.uid}`);
  let userObj = $firebaseObject(user);
  let userMessages = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`);

  window.onbeforeunload = function() {
    // logOut();
  };

  userObj.$loaded(function() {
    $scope.user = userObj;
    $rootScope.loading = false;
  });

  $scope.logOut = logOut;
  $scope.setActivePage = setActivePage;
  $scope.activePage = currentPage[currentPage.length - 1];

  userMessages.on('child_changed', function(event) {
    let item = event.val();
    let currentLocation = $location.path();

    if (item.newMessages === true &&
        (currentLocation.indexOf(item.name)) === -1) {
      let messageIn = new Audio('../../sounds/sound_1.mp3');
      messageIn.play();
      toastr.error(`<b>${item.title}</b>, new message!`);
    }
  });

  function logOut() {
    $rootScope.loading = true;
    auth.unauthUser();
    user.update({

      lastLoggedOut: (new Date()).getTime()
    });
    $rootScope.loading = false;
    $location.path('/auth');
  }

  function setActivePage(page) {
    $scope.activePage = page;
  }
}];
