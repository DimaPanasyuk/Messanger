export default
['$scope', '$rootScope',
 '$location', 'auth', 'fire',
 'userInfo', '$firebaseObject',
 '$firebaseArray',

($scope, $rootScope, $location, auth, fire, userInfo, 
  $firebaseObject, $firebaseArray) => {
  $rootScope.loading = true;
  let currentPage = location.href.split('/');
  let user = new Firebase(`${fire}/users/${userInfo.uid}`);
  let userObj = $firebaseObject(user);
  let userDialogsRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`);
  let userDialogs = $firebaseArray(userDialogsRef);
  let currentLocation = window.location.href;
  window.onbeforeunload = () => {
    // logOut();
  };

  userObj.$loaded(() => {
    $scope.user = userObj;
    $rootScope.loading = false;
  });

  $scope.logOut = logOut;
  $scope.setActivePage = setActivePage;
  $scope.activePage = currentPage[currentPage.length - 1];

  // Remove for awhile
  // userDialogs.$loaded(() => {
  //   userDialogs.forEach(dialog => {
  //     let dialogRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${dialog.name}`);
  //     let eventEmitted = 0;
  //     dialogRef.child('status').on('child_changed', function(ev) {
  //       let event = ev.val();
  //       if (event !== false && (currentLocation.indexOf(dialog.name)) === -1) {
  //         if (eventEmitted !== 0) {
  //           console.debug('false');
  //         } else {
  //           eventEmitted = 0;
  //           let messageIn = new Audio('../../sounds/sound_1.mp3');
  //           messageIn.play();
  //           toastr.error(`<b>${dialog.title}</b>, new message!`);
  //           eventEmitted = 1;
  //         }
  //       }
  //     });
  //   });
  // });

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
