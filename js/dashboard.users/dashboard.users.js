import _ from 'lodash';

export default
['$scope', '$rootScope', 'userInfo', '$location',
 'fire', '$firebaseArray', '$firebaseObject',

function($scope, $rootScope, userInfo, $location, fire, $firebaseArray, $firebaseObject) {
  $rootScope.loading = true;
  let usersRef = new Firebase(`${fire}/users`);
  let users = $firebaseArray(usersRef);
  let currentUserFriendsRef = new Firebase(`${fire}/users/${userInfo.uid}/friends`);
  let currentUserFriends = $firebaseArray(currentUserFriendsRef);

  $scope.currentUserFriends = currentUserFriends;

  users.$loaded(function() {
    $scope.users = users
    .filter(function(user) {
      return user.info !== null;
    })
    .filter(function(user) {
      return user.id !== userInfo.uid;
    })
    .map(function(user) {
      if (_.find(currentUserFriends, {
        id: user.$id
      })) {
        user.$$friend = true;
        return user;
      } else {
        user.$$friend = false;
        return user;
      }
    });
    $rootScope.loading = false;
  });

  $scope.pageTitle = 'Users page';
  $scope.filter = 'show-all';
  $scope.filterUsers = filterUsers;
  $scope.toggleFriends = toggleFriends;
  $scope.showProfile = showProfile;

  function showProfile(user) {
    $location.path(`/users/${user.$id}/info`);
  }

  function filterUsers(state) {
    $scope.filter = state;
    switch (state) {
      case 'show-all':
        $scope.users = users.filter(function(user) {
          return user.info !== null;
        })
        .filter(function(user) {
          return user.id !== userInfo.uid;
        })
        .map(function(user) {
          if (_.find(currentUserFriends, {
            id: user.id
          })) {
            user.$$friend = true;
            return user;
          } else {
            user.$$friend = false;
            return user;
          }
        });
        break;
      case 'show-online':
        $scope.users = users
        .filter(function(user) {
          return user.info !== null;
        })
        .filter(function(user) {
          return user.id !== userInfo.uid;
        })
        .filter(function(user) {
          return user.lastLoggedOut === 0;
        })
        .map(function(user) {
          if (_.find(currentUserFriends, {
            id: user.id
          })) {
            user.$$friend = true;
            return user;
          } else {
            user.$$friend = false;
            return user;
          }
        });
        break;
      default:
    }
  }

  function toggleFriends(user) {
    if (_.find(currentUserFriends, {
      id: user.$id
    })) {
      let userRef = new Firebase(`${fire}/users/${userInfo.uid}/friends/${user.$id}`);
      let userU = $firebaseObject(userRef);

      userU
      .$remove()
      .then(function() {
        user.$$friend = false;
      });
    } else {
      currentUserFriendsRef.child(user.$id)
      .set({
        id: user.$id
      });
      user.$$friend = true;
    }
  }
}];
