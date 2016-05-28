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
      
      let dialog_exists = _.find(current_user_dialogs, { name: $scope.toUser.info.name + '_' + $scope.toUser.info.surname}),
          time          = (new Date()).getTime();
          
      if (dialog_exists) {
        
        dialog_exists.participants.forEach(function(participant) {
          
          if (userInfo.uid === participant) {
            
            let dialog_messages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${dialog_exists.name}/messages`));
            let dialog          = new Firebase(`${fire}/users/${participant}/dialogs/${dialog_exists.name}`);
            dialog_messages.$add({
              author: current_user.info.name + ' ' + current_user.info.surname,
              time: time,
              text: $scope.message.text,
              authorId: current_user.id,
              authorPhoto: current_user.info.image 
            })
            dialog.child('newMessages').set(false);
          } else {
            
            let friend_dialog   = current_user.info.name + '_' + current_user.info.surname; 
            let dialog_messages = $firebaseArray(new Firebase(`${fire}/users/${participant}/dialogs/${friend_dialog}/messages`));
            let dialog          = new Firebase(`${fire}/users/${participant}/dialogs/${friend_dialog}`);
            dialog_messages.$add({
              author: current_user.info.name + ' ' + current_user.info.surname,
              time: time,
              text: $scope.message.text,
              authorId: current_user.id,
              authorPhoto: current_user.info.image 
            })
            
            dialog.child('newMessages').set(true); 
          }
        })
        $scope.message.text = '';
      } else {
                             
        let receiver_user_dialogs_ref = new Firebase(`${fire}/users/${$scope.toUser.id}/dialogs`),
            current_user_dialogs_ref  = new Firebase(`${fire}/users/${userInfo.uid}/dialogs`),
            dialog_title_for_user     = $scope.toUser.info.name + '_' + $scope.toUser.info.surname,
            dialog_title_for_friend   = current_user.info.name + '_' + current_user.info.surname,
            participants              = [$scope.toUser.id, current_user.id];
        
        receiver_user_dialogs_ref.child(dialog_title_for_friend).set({
          
          title: dialog_title_for_friend.split('_').join(' '),
          name: dialog_title_for_friend,
          participants: participants,
          toOneUser: true
        });
        
        current_user_dialogs_ref.child(dialog_title_for_user).set({
          
          title: dialog_title_for_user.split('_').join(' '),
          name: dialog_title_for_user,
          participants: participants,
          toOneUser: true
        });        
        
        setTimeout(function() {
          
          sendMessage();
        }, 500);              
      }
    })
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