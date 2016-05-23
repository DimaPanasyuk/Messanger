export default
['$scope', '$rootScope', 'userInfo', '$timeout', 
 'fire', '$firebaseObject', '$firebaseArray',
function($scope, $rootScope, userInfo, $timeout, 
 fire, $firebaseObject, $firebaseArray) {
  
  $rootScope.loading = true;
  $scope.pageTitle = 'List of your friends';
  let friends_ref  = new Firebase(`${fire}/users/${userInfo.uid}/friends`),
      friends      = $firebaseArray(friends_ref),
      current_user_friends_ref = new Firebase(`${fire}/users/${userInfo.uid}/friends`),
      current_user_friends     = $firebaseArray(current_user_friends_ref);
  
  friends.$loaded(function() {
   
    $scope.friends = friends;
    $rootScope.loading = false;
  })
  
  $scope.filter        = 'show-all';
  $scope.removeFriend  = removeFriend;
  $scope.filterFriends = filterFriends;
  
  function filterFriends(state) {
    
    $scope.filter = state;
    switch(state) {
      
      case 'show-all':
        $scope.friends = friends;
        break;
      case 'show-online':
        $scope.friends = friends
        .filter(function(friend) {
          
          return friend.lastLoggedOut === 0;
        });
    }
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