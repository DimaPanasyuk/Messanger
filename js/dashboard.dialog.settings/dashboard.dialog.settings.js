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
    
    $rootScope.subLoading = true;
    let current_dialog_ref  = new Firebase(`${fire}/users/${userInfo.uid}/dialogs/${$stateParams.name}`),
        current_dialog      = $firebaseObject(current_dialog_ref),
        current_friends_ref = new Firebase(`${fire}/users/${userInfo.uid}/friends`),
        users_ref           = new Firebase(`${fire}/users`),
        current_friends     = $firebaseArray(current_friends_ref),
        users               = $firebaseArray(users_ref);
         
    $scope.participants     = [];
    $scope.friends          = [];
    $scope.current_user     = userInfo.uid;
    
    //Getting data and ordering it
    current_dialog.$loaded(function() {
      
      $rootScope.subLoading = false;
      $scope.current_dialog = current_dialog;
      if (current_dialog.participants.length > 1) {
        
        getAllData();
      } else {
        
       current_friends.$loaded(function() {
         
         $scope.friends = users.filter(user => _.find(current_friends, { id: user.id }));
       }) 
      }
    });  
    
    $scope.removeParticipant = removeParticipant;
    $scope.addParticipant    = addParticipant;
    $scope.saveChanges       = saveChanges;
    $scope.cancelChanges     = cancelChanges;
    
    function addParticipant(participant) {
      
      _.remove($scope.friends, {
        id: participant.id
      })
      
      $scope.participants.push({
        name: participant.info.name,
        surname: participant.info.surname,
        uid: participant.id,
        photo: participant.info.image
      });
    }
    
    function removeParticipant(participant) {
            
      _.remove($scope.participants, {
        uid: participant.uid
      })
      
      $scope.friends.push({
        id: participant.uid,
        info: {
          name: participant.name,
          surname: participant.surname,
          image: participant.photo
        }        
      })
    }
    
    function saveChanges() {
      
      let participants = angular.copy($scope.participants);
      let friends      = angular.copy($scope.friends);
      participants     = participants.map(function(participant) {
        
        return participant.uid;
      });
      participants[participants.length] = userInfo.uid;

      friends.forEach(function(friend) {
        
        let dialog_ref = new Firebase(`${fire}/users/${friend.id}/dialogs/${$stateParams.name}`);
            dialog_ref.child('participants').set(null);
      })
      
      participants.forEach(function(participant) {
        
        let dialog_ref = new Firebase(`${fire}/users/${participant}/dialogs/${$stateParams.name}`);
          dialog_ref.child('participants').set(participants);
          dialog_ref.child('name').set($stateParams.name);
          dialog_ref.child('title').set($stateParams.name.split('_').join(' '));
      })
      
      toastr.error('Changes applied successfully!');
      
      $location.path(`/dialogs/${$stateParams.name}/messages`);
    }
    
    function cancelChanges() {
      
      $location.path(`/dialogs/${$stateParams.name}/messages`);
    }    
    
    function getAllData() {
      
      $scope.participants_prev = current_dialog
        .participants
        .filter(function(participant) {
          
          return participant !== userInfo.uid;
        })
        .forEach(function(participant) {
          
          let participant_info = $firebaseObject(new Firebase(`${fire}/users/${participant}`));
          participant_info.$loaded(function() {
             
             $scope.participants.push({
            
                name: participant_info.info.name,
                surname: participant_info.info.surname,
                photo: participant_info.info.image,
                uid: participant_info.id
             })
             current_friends.$loaded(function() {
        
                $scope.friends = users
                .filter(user => _.find(current_friends, { id: user.id }))
                .filter(function(friend) {
                  
                  return !(_.find($scope.participants, {
                    
                    uid: friend.id
                  }))
                })
             })
           })  
        })
    }
  }
]