import _ from 'lodash';

export default
['$scope', '$rootScope', 'userInfo', '$timeout', '$location',
 'fire', '$firebaseObject', '$firebaseArray',
function($scope, $rootScope, userInfo, $timeout, $location,
 fire, $firebaseObject, $firebaseArray) {
  $rootScope.loading = true;
  $scope.pageTitle = 'List of your friends';
  let friendsRef = new Firebase(`${fire}/users/${userInfo.uid}/friends`);
  let usersRef = new Firebase(`${fire}/users`);
  let users = $firebaseArray(usersRef);
  let friends = $firebaseArray(friendsRef);
  let currentUser = $firebaseObject(new Firebase(`${fire}/users/${userInfo.uid}`));
  let currentUserDialogs = $firebaseArray(new Firebase(`${fire}/users/${userInfo.uid}/dialogs`));
  users.$loaded(function() {
    friends.$loaded(function() {
      $scope.friends = $scope.friendsTotal = users.filter(user => _.find(friends, {id: user.$id}));
      $rootScope.loading = false;
    });
  });
  $scope.filter = 'show-all';
  $scope.removeFriend = removeFriend;
  $scope.filterFriends = filterFriends;
  $scope.createChat = createChat;
  $scope.sendMessage = sendMessage;
  $scope.checkEnter = checkEnter;
  $scope.showProfile = showProfile;
  function showProfile(profile) {
    $location.path(`/users/${profile.id}/info`);
  }
  function checkEnter(e) {
    if (e.keyCode === 13) {
      $timeout(function() {
        document.querySelector('#sendMessage').click();
      }, 0);
    }
  }
  function filterFriends(state) {
    $scope.filter = state;
    switch (state) {
      case 'show-all':
        $scope.friends = $scope.friendsTotal;
        break;
      case 'show-online':
        $scope.friends = $scope.friendsTotal
        .filter(function(friend) {
          return friend.lastLoggedOut === 0;
        });
        break;
      default:
    }
  }
  function sendMessage() {
    currentUserDialogs.$loaded(function() {
      let friendDialogsRef = new Firebase(`${fire}/users/${$scope.toUser.$id}/dialogs`);
      let currentUserDialogsRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`);
      let friendDialogs = $firebaseArray(friendDialogsRef);
      let dialogExists = _.find(currentUserDialogs, {name: $scope.toUser.info.name + '_' + $scope.toUser.info.surname});
      let time = (new Date()).getTime();
      let participants = [$scope.toUser.$id, currentUser.id];

      friendDialogs.$loaded(function() {
        let friendDialogExists = _.find(friendDialogs, {name: currentUser.info.name + '_' + currentUser.info.surname});

        if (!dialogExists && !friendDialogExists) {
          let dialogTitleForFriend = currentUser.info.name + '_' + currentUser.info.surname;
          let dialogTitleForUser = $scope.toUser.info.name + '_' + $scope.toUser.info.surname;
          friendDialogExists = {
            title: dialogTitleForFriend.split('_').join(' '),
            name: dialogTitleForFriend,
            participants: participants,
            toOneUser: true
          };
          dialogExists = {
            title: dialogTitleForUser.split('_').join(' '),
            name: dialogTitleForUser,
            participants: participants,
            toOneUser: true
          };

          friendDialogsRef.child(dialogTitleForFriend).set(friendDialogExists);
          currentUserDialogsRef.child(dialogTitleForUser).set(dialogExists);

          $timeout(function() {
            sendMessages(dialogExists, time);
          }, 200);
        } else if (!friendDialogExists) {
          let dialogTitleForFriend = currentUser.info.name + '_' + currentUser.info.surname;
          friendDialogExists = {
            title: dialogTitleForFriend.split('_').join(' '),
            name: dialogTitleForFriend,
            participants: participants,
            toOneUser: true
          };

          friendDialogsRef.child(dialogTitleForFriend).set(friendDialogExists);

          sendMessages(dialogExists, time);
        } else if (!dialogExists) {
          let dialogTitleForUser = $scope.toUser.info.name + '_' + $scope.toUser.info.surname;
          dialogExists = {
            title: dialogTitleForUser.split('_').join(' '),
            name: dialogTitleForUser,
            participants: participants,
            toOneUser: true
          };
          currentUserDialogsRef.child(dialogTitleForUser).set(dialogExists);

          sendMessages(dialogExists, time);
        } else if (dialogExists && friendDialogExists) {
          sendMessages(dialogExists, time);
        }
      });
    });
  }

  function sendMessages(dialogItem, time) {
    dialogItem.participants.forEach(function(participant) {
      // Adds message to your dialog
      if (userInfo.uid === participant) {
        let dialogMessages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${dialogItem.name}/messages`));
        let dialog = new Firebase(`${fire}/users/${participant}/dialogs/${dialogItem.name}`);

        dialogMessages.$add({
          author: currentUser.info.name + ' ' + currentUser.info.surname,
          time: time,
          text: $scope.message.text,
          authorId: currentUser.id,
          authorPhoto: currentUser.info.image
        });
        dialog.child('newMessages').set(false);
      // Sends message for your friend
      } else {
        let friendDialog = currentUser.info.name + '_' + currentUser.info.surname;
        let dialogMessages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${friendDialog}/messages`));
        let dialog = new Firebase(`${fire}/users/${participant}/dialogs/${friendDialog}`);
        
        dialogMessages.$add({
          author: currentUser.info.name + ' ' + currentUser.info.surname,
          time: time,
          text: $scope.message.text,
          authorId: currentUser.id,
          authorPhoto: currentUser.info.image
        });

        dialog.child('newMessages').set(true);
      }
    });
    $scope.message.text = '';
  }

  function createChat(friend) {
    $scope.toUser = friend;
  }

  function removeFriend(friend) {
    let friendRef = new Firebase(`${fire}/users/${userInfo.uid}/friends/${friend.$id}`);
    let friendU = $firebaseObject(friendRef);
    friendU
    .$remove()
    .then(function() {
      _.remove($scope.friends, {
        $id: friend.$id
      });
    });
  }
}];
