import _ from 'lodash';

export default
['$scope', '$rootScope', '$firebaseArray', '$stateParams',
 '$timeout', '$interval', '$location', 'userInfo', 'fire',
 '$firebaseObject',
function($scope, $rootScope, $firebaseArray, $stateParams,
  $timeout, $interval, $location, userInfo, fire, $firebaseObject) {
  $rootScope.subLoading = true;
  let currentDialogRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${$stateParams.name}`);
  let currentDialog = $firebaseObject(currentDialogRef);
  let currentUser = $firebaseObject(new Firebase(`${fire}/users/${userInfo.uid}`));
  let messagesRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${$stateParams.name}/messages`);
  let messages = $firebaseArray(messagesRef);
  let userPhotos = $firebaseArray(new Firebase(`${fire}/users/${userInfo.uid}/info/photos`));
  $scope.userUid = userInfo.uid;

  currentDialog.$loaded(function() {
    $scope.currentDialog = currentDialog;
    currentDialogRef.child('newMessages').set(false);
    $rootScope.subLoading = false;
  });
  userPhotos.$loaded(function() {
    $scope.userPhotos = userPhotos;
  });
  currentUser.$loaded(function() {
    $scope.message = {

      author: currentUser.info.name + ' ' + currentUser.info.surname,
      time: '',
      text: '',
      pictures: [],
      authorId: currentUser.id,
      authorPhoto: currentUser.info.image
    };
  });

  $scope.currentDate = 1463754897700;

  $scope.dialogTitle = $stateParams.name.split('_').join(' ');
  $scope.dialogName = $stateParams.name;
  $scope.messages = messages;
  $scope.sendMessage = sendMessage;
  $scope.watchEnter = watchEnter;
  $scope.goBack = goBack;
  $scope.addPhoto = addPhoto;
  $scope.removePhoto = removePhoto;
  $scope.showPhoto = showPhoto;

  function watchEnter(e) {
    if (e.keyCode === 13) {
      $timeout(function() {
        angular.element('#message_text').triggerHandler('click');
      }, 0);
    }
  }

  function sendMessage() {
    $scope.message.time = (new Date()).getTime();

    if ($scope.currentDialog.toOneUser) {
      $scope.currentDialog.participants.forEach(function(participant) {
        if (userInfo.uid === participant) {
          let participantMessages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}/messages`));
          let dialog = new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}`);
          participantMessages.$add($scope.message);
          dialog.child('newMessages').set(false);
        } else {
          let dialogName = currentUser.info.name + '_' + currentUser.info.surname;
          let dialog = new Firebase(`${fire}/users/${participant}/dialogs/${dialogName}`);
          let participantMessages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${dialogName}/messages`));

          participantMessages.$add($scope.message);
          dialog.child('newMessages').set(true);
          // add this feature back but (2 notifications)
          // dialog.child('lastMessageTime').set((new Date()).getTime());
        }
      });
      $scope.message.text = '';
      $scope.message.pictures = [];
    } else {
      $scope.currentDialog.participants.forEach(function(participant) {
        let participantMessages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}/messages`));
        let dialog = new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}`);
        participantMessages.$add($scope.message);

        // dialog.child('lastMessageTime').set((new Date()).getTime());
        if (userInfo.uid !== participant) {
          dialog.child('newMessages').set(true);
        }
      });
      $scope.message.text = '';
      $scope.message.pictures = [];
    }
  }

  function showPhoto(photo) {
    $scope.shownPhoto = photo;
  }

  function goBack() {
    currentDialogRef.child('newMessages').set(false);
    $location.path('/dialogs');
  }

  function addPhoto(photo) {
    if (_.find($scope.message.pictures, {value: photo.$value})) {
      toastr.info('Image already added!');
    } else {
      $scope.message.pictures.push({
        value: photo.$value
      });
    }
  }

  function removePhoto(photo) {
    _.remove($scope.message.pictures, {value: photo.value});
  }
}];
