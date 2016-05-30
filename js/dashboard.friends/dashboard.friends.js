import _ from 'lodash';

export default
['$scope', '$rootScope', 'userInfo', '$timeout', '$location',
 'fire', '$firebaseObject', '$firebaseArray', '$stateParams',
function($scope, $rootScope, userInfo, $timeout, $location,
 fire, $firebaseObject, $firebaseArray, $stateParams) {
  
  $rootScope.subLoading = true;
  $scope.pageTitle = 'List of your friends';
  let friends_ref  = new Firebase(`${fire}/users/${userInfo.uid}/friends`),
      current_user_friends_ref = new Firebase(`${fire}/users/${userInfo.uid}/friends`),
      users_ref    = new Firebase(`${fire}/users`),
      users        = $firebaseArray(users_ref),
      friends      = $firebaseArray(friends_ref),
      current_user = $firebaseObject(new Firebase(`${fire}/users/${userInfo.uid}`)),
      current_user_dialogs = $firebaseArray(new Firebase(`${fire}/users/${userInfo.uid}/dialogs`)),
      current_user_friends     = $firebaseArray(current_user_friends_ref);
  
  users.$loaded(function() {
    
    friends.$loaded(function() {
    
      $scope.friends = $scope.friends_total = users.filter(user => _.find(friends, { id: user.id }));
      $rootScope.subLoading = false;
    })
  })
  
  $scope.filter        = 'show-all';
  $scope.removeFriend  = removeFriend;
  $scope.filterFriends = filterFriends;
  $scope.createChat    = createChat;
  $scope.sendMessage   = sendMessage;
  $scope.checkEnter    = checkEnter;
  $scope.showProfile   = showProfile;
  
  
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
    switch(state) {
      
      case 'show-all':
        $scope.friends = $scope.friends_total;
        break;
      case 'show-online':
        $scope.friends = $scope.friends_total
        .filter(function(friend) {
          
          return friend.lastLoggedOut === 0;
        });
    }
  }
  
  function sendMessage() {
    
    current_user_dialogs.$loaded(function() {
      
      let friend_dialogs_ref       = new Firebase(`${fire}/users/${$scope.toUser.id}/dialogs`),
          current_user_dialogs_ref = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`),
          friend_dialogs           = $firebaseArray(friend_dialogs_ref),
          dialog_exists            = _.find(current_user_dialogs, { name: $scope.toUser.info.name + '_' + $scope.toUser.info.surname}),
          time                     = (new Date()).getTime(),
          participants             = [$scope.toUser.id, current_user.id];
      
      
      friend_dialogs.$loaded(function() {
        
        let friend_dialog_exists = _.find(friend_dialogs, {name: current_user.info.name + '_' + current_user.info.surname});      
        
        if (!dialog_exists && !friend_dialog_exists) {


          let dialog_title_for_friend = current_user.info.name + '_' + current_user.info.surname,
              dialog_title_for_user = $scope.toUser.info.name + '_' + $scope.toUser.info.surname;
              friend_dialog_exists  = {
                title: dialog_title_for_friend.split('_').join(' '),
                name: dialog_title_for_friend,
                participants: participants,
                toOneUser: true
              },
              dialog_exists = {
                title: dialog_title_for_user.split('_').join(' '),
                name: dialog_title_for_user,
                participants: participants,
                toOneUser: true
              };
          
          friend_dialogs_ref.child(dialog_title_for_friend).set(friend_dialog_exists);
          current_user_dialogs_ref.child(dialog_title_for_user).set(dialog_exists);
          
          $timeout(function() {
            
            sendMessages(dialog_exists, time);
          }, 200);
        }
        //If your friend has no dialog
        else if (!friend_dialog_exists) {
          
          let dialog_title_for_friend = current_user.info.name + '_' + current_user.info.surname,
              friend_dialog_exists    = {
                title: dialog_title_for_friend.split('_').join(' '),
                name: dialog_title_for_friend,
                participants: participants,
                toOneUser: true
              };
          
          friend_dialogs_ref.child(dialog_title_for_friend).set(friend_dialog_exists);
          
          sendMessages(dialog_exists, time);
        
        } else if (!dialog_exists) {
          
          let dialog_title_for_user = $scope.toUser.info.name + '_' + $scope.toUser.info.surname;
              dialog_exists         = {
                title: dialog_title_for_user.split('_').join(' '),
                name: dialog_title_for_user,
                participants: participants,
                toOneUser: true
              }
          current_user_dialogs_ref.child(dialog_title_for_user).set(dialog_exists);
          
          sendMessages(dialog_exists, time);
           
        } else if (dialog_exists && friend_dialog_exists) {
          
          sendMessages(dialog_exists, time);
        }
      })  
    })
  }
  
  function sendMessages(dialog_item, time) {
    
    dialog_item.participants.forEach(function(participant) {
            
      //Adds message to your dialog           
      if (userInfo.uid === participant) {
        
        let dialog_messages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${dialog_item.name}/messages`)),
            dialog          = new Firebase(`${fire}/users/${participant}/dialogs/${dialog_item.name}`);
        
        dialog_messages.$add({
          author: current_user.info.name + ' ' + current_user.info.surname,
          time: time,
          text: $scope.message.text,
          authorId: current_user.id,
          authorPhoto: current_user.info.image 
        })
        dialog.child('newMessages').set(false);
        //dialog.child('lastMessageTime').set((new Date()).getTime());
      
      //Sends message for your friend  
      } else {
        
        let friend_dialog   = current_user.info.name + '_' + current_user.info.surname, 
            dialog_messages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${friend_dialog}/messages`)),
            dialog          = new Firebase(`${fire}/users/${participant}/dialogs/${friend_dialog}`);
        dialog_messages.$add({
          author: current_user.info.name + ' ' + current_user.info.surname,
          time: time,
          text: $scope.message.text,
          authorId: current_user.id,
          authorPhoto: current_user.info.image 
        })
        
        dialog.child('newMessages').set(true); 
        //dialog.child('lastMessageTime').set((new Date()).getTime()); 
      }
    })
    $scope.message.text = ''; 
  }
  
  function createChat(friend) {
    $scope.toUser = friend;
  }
  
  function removeFriend(friend, index) {
    
    let friend_ref = new Firebase(`${fire}/users/${userInfo.uid}/friends/${friend.$id}`),
        friend_u   = $firebaseObject(friend_ref);      
    friend_u
    .$remove()
    .then(function(data) {
      
      _.remove($scope.friends, {
        $id: friend.$id
      })
    })
  }
}]