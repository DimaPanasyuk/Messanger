import _ from 'lodash';

export default [
  '$scope',
  '$rootScope',
  '$stateParams',
  '$location',
  'userInfo',
  'fire',
  '$firebaseObject',
  '$firebaseArray',
  function($scope, $rootScope, $stateParams, $location, userInfo,
    fire, $firebaseObject, $firebaseArray) {
    $rootScope.loading = true;
    let currentDialogRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${$stateParams.name}`);
    let currentDialog = $firebaseObject(currentDialogRef);
    let currentFriendsRef = new Firebase(`${fire}/users/${userInfo.uid}/friends`);
    let usersRef = new Firebase(`${fire}/users`);
    let currentFriends = $firebaseArray(currentFriendsRef);
    let users = $firebaseArray(usersRef);

    $scope.participants = [];
    $scope.friends = [];
    $scope.currentUser = userInfo.uid;

    // Getting data and ordering it
    currentDialog.$loaded(function() {
      $scope.currentDialog = currentDialog;
      if (currentDialog.participants.length > 1) {
        getAllData();
      } else {
        users.$loaded(function() {
          currentFriends.$loaded(function() {
            $scope.friends = users.filter(user => _.find(currentFriends, {$id: user.$id}));
            console.debug($scope.friends);
            $rootScope.loading = false;
          });
        });
      }
    });

    $scope.removeParticipant = removeParticipant;
    $scope.addParticipant = addParticipant;
    $scope.saveChanges = saveChanges;
    $scope.cancelChanges = cancelChanges;

    function addParticipant(participant) {
      _.remove($scope.friends, {
        $id: participant.$id
      });

      $scope.participants.push({
        name: participant.info.name,
        surname: participant.info.surname,
        uid: participant.$id,
        photo: participant.info.image
      });
    }

    function removeParticipant(participant) {
      _.remove($scope.participants, {
        uid: participant.uid
      });

      $scope.friends.push({
        $id: participant.uid,
        info: {
          name: participant.name,
          surname: participant.surname,
          image: participant.photo
        }
      });
    }

    function saveChanges() {
      let participants = angular.copy($scope.participants);
      let friends = angular.copy($scope.friends);
      participants = participants.map(function(participant) {
        return participant.uid;
      });
      participants[participants.length] = userInfo.uid;

      friends.forEach(function(friend) {
        let dialogRef = new Firebase(`${fire}/users/${friend.$id}/dialogs/${$stateParams.name}`);
        dialogRef.child('participants').set(null);
      });

      participants.forEach(function(participant) {
        let dialogRef = new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}`);
        dialogRef.child('participants').set(participants);
        dialogRef.child('name').set($stateParams.name);
        dialogRef.child('title').set($stateParams.name.split('_').join(' '));
      });

      toastr.error('Changes applied successfully!');

      $location.path(`/dialogs/${$stateParams.name}/messages`);
    }

    function cancelChanges() {
      $location.path(`/dialogs/${$stateParams.name}/messages`);
    }

    function getAllData() {
      $scope.participantsPrev = currentDialog
        .participants
        .filter(function(participant) {
          return participant !== userInfo.uid;
        })
        .forEach(function(participant) {
          let participantInfo = $firebaseObject(new Firebase(`${fire}/users/${participant}`));
          participantInfo.$loaded(function() {
            $scope.participants.push({

              name: participantInfo.info.name,
              surname: participantInfo.info.surname,
              photo: participantInfo.info.image,
              uid: participantInfo.$id
            });
            currentFriends.$loaded(function() {
              $scope.friends = users
              .filter(user => _.find(currentFriends, {$id: user.$id}))
              .filter(function(friend) {
                return !(_.find($scope.participants, {

                  uid: friend.$id
                }));
              });
              $rootScope.loading = false;
            });
          });
        });
    }
  }];
