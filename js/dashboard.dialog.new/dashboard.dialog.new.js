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
  let dialog_ref   = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`),
      friends_ref  = new Firebase(`${fire}/users/${userInfo.uid}/friends`), 
      dialogs      = $firebaseArray(dialog_ref),
      friends      = $firebaseArray(friends_ref);
      
  dialogs.$loaded(function() {
    
    $rootScope.subLoading = false;
    $scope.friends = friends;
  });
  
  $scope.dialog       = {
    title: '',
    participants: []
  };
  $scope.dialogs             = dialogs;
  $scope.create              = create;
  $scope.cancel              = cancel;
  $scope.addParticipant      = addParticipant;
  $scope.removeParticipant   = removeParticipant;
  
  function create() {
    
    let participants = angular.copy($scope.dialog.participants);
    $scope.dialog.name = $scope.dialog.title.split(' ').join('_');
    
    participants = participants.map(function(participant) {
      
      return participant.uid;
    });
    participants[participants.length] = userInfo.uid;
    
    participants.forEach(function(participant) {
      
      let participant_dialogs_ref =  new Firebase(`${fire}/users/${participant}/dialogs`);
          
      //Adding dialog for choosed user    
      participant_dialogs_ref.child($scope.dialog.name).set({
        
        title: $scope.dialog.title,
        name: $scope.dialog.name,
        participants: participants,
        newMessages: false
      });
    
      //Adding dialog for current user
      dialog_ref.child($scope.dialog.name).set({
        
        title: $scope.dialog.title,
        name: $scope.dialog.name,
        participants: participants,
        newMessages: false,
        dialogHost: userInfo.uid
      });
    })
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
    })
  }
  
  
}]