import _ from 'lodash';

export default
['$scope',
 '$rootScope',
 '$firebaseArray',
 '$location',
 'userInfo',
 'fire',
function($scope, $rootScope, $firebaseArray, $location, userInfo, fire) {
  $rootScope.subLoading = true;
  let dialogRef = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`);
  let friendsRef = new Firebase(`${fire}/users/${userInfo.uid}/friends`);
  let usersRef = new Firebase(`${fire}/users`);
  let dialogs = $firebaseArray(dialogRef);
  let friends = $firebaseArray(friendsRef);
  let users = $firebaseArray(usersRef);

  dialogs.$loaded(function() {
    $rootScope.subLoading = false;
    $scope.friends = users.filter(user => _.find(friends, {id: user.id}));
  });

  $scope.dialog = {
    title: '',
    participants: []
  };
  $scope.dialogs = dialogs;
  $scope.create = create;
  $scope.cancel = cancel;
  $scope.addParticipant = addParticipant;
  $scope.removeParticipant = removeParticipant;

  function create() {
    let participants = angular.copy($scope.dialog.participants);
    $scope.dialog.name = $scope.dialog.title.split(' ').join('_');

    participants = participants.map(function(participant) {
      return participant.uid;
    });
    participants[participants.length] = userInfo.uid;

    participants.forEach(function(participant) {
      let participantDialogRef = new Firebase(`${fire}/users/${participant}/
      dialogs`);
      if (participant === userInfo.uid) {
        participantDialogRef.child($scope.dialog.name).set({
          title: $scope.dialog.title,
          name: $scope.dialog.name,
          participants: participants,
          newMessages: false,
          dialogHost: userInfo.uid
        });
      } else {
        participantDialogRef.child($scope.dialog.name).set({

          title: $scope.dialog.title,
          name: $scope.dialog.name,
          participants: participants,
          newMessages: false
        });
      }
    });
    toastr.error(`Dialog ${$scope.dialog.title} created successfully!`);
    $location.path('/dialogs');
  }

  function cancel() {
    $location.path('/dialogs');
  }

  function addParticipant(participant) {
    $scope.dialog.participants.push({

      name: participant.info.name,
      surname: participant.info.surname,
      uid: participant.id,
      photo: participant.info.image
    });

    _.remove($scope.friends, {

      id: participant.id
    });
  }

  function removeParticipant(participant) {
    _.remove($scope.dialog.participants, {

      uid: participant.uid
    });

    $scope.friends.push({

      id: participant.uid,
      info: {
        name: participant.name,
        surname: participant.surname,
        image: participant.photo
      }
    });
  }
}];
