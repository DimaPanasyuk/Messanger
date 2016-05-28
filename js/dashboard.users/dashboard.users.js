import _ from 'lodash';

export default
['$scope', '$rootScope', 'userInfo', '$location',
 'fire', '$firebaseArray', '$firebaseObject',

function($scope, $rootScope, userInfo, $location, fire, $firebaseArray, $firebaseObject) {
  
  $rootScope.subLoading        = true;
  let users_ref                = new Firebase(`${fire}/users`),
      users                    = $firebaseArray(users_ref),
      current_user_friends_ref = new Firebase(`${fire}/users/${userInfo.uid}/friends`),
      current_user_friends     = $firebaseArray(current_user_friends_ref);
  
  $scope.current_user_friends = current_user_friends;
  
  users.$loaded(function() {
    
    $scope.users = users
    .filter(function(user) {
      
      return user.info != null;
    })
    .filter(function(user) {
      
      return user.id !== userInfo.uid;
    })
    .map(function(user) {
      
      if (_.find(current_user_friends, {
        id: user.id
      })) {
        
        user.$$friend = true;
        return user;
      } else {
        
        user.$$friend = false;
        return user;
      }
    })
    $rootScope.subLoading = false;
  });    
  
  $scope.pageTitle = 'Users page';
  $scope.filter = 'show-all';
  $scope.filterUsers = filterUsers;
  $scope.toggleFriends = toggleFriends;
  $scope.showProfile   = showProfile;
  
  function showProfile(user) {
    
    $location.path(`/users/${user.id}/info`);
  }  
  
  function filterUsers(state) {
    
    $scope.filter = state;
    switch(state) {
      
      case 'show-all':
        $scope.users = users.filter(function(user) {
      
          return user.info != null;
        })
        .filter(function(user) {
          
          return user.id !== userInfo.uid;
        })
        .map(function(user) {
      
          if (_.find(current_user_friends, {
            id: user.id
          })) {
            
            user.$$friend = true;
            return user;
          } else {
            
            user.$$friend = false;
            return user;
          }
        })
        break;
      case 'show-online':
        $scope.users = users
        .filter(function(user) {
      
          return user.info != null;
        })
        .filter(function(user) {
          
          return user.id !== userInfo.uid;
        })
        .filter(function(user) {
          
          return user.lastLoggedOut === 0;
        })
        .map(function(user) {
      
          if (_.find(current_user_friends, {
            id: user.id
          })) {
            
            user.$$friend = true;
            return user;
          } else {
            
            user.$$friend = false;
            return user;
          }
        })
    }
  }
  
  function toggleFriends(user, index) {
    
    if(_.find(current_user_friends, {
      id: user.id 
    })) {
      
      
      let user_ref = new Firebase(`${fire}/users/${userInfo.uid}/friends/${user.$id}`),
          user_u   = $firebaseObject(user_ref); 
         
       user_u  
        .$remove()
        .then(function(data) {
          user.$$friend = false;
        })
    } else {
      
      current_user_friends_ref.child(user.id)
        .set({
          id: user.id          
        });
        user.$$friend = true;
    }
  }
}]