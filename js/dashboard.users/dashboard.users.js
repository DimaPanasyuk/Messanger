export default
['$scope', '$rootScope', 'userInfo',
 'fire', '$firebaseArray',

function($scope, $rootScope, userInfo, fire, $firebaseArray) {
  
  $rootScope.loading = true;
  let users_ref = new Firebase(`${fire}/users`),
      users     = $firebaseArray(users_ref);

  users.$loaded(function() {
    
    $rootScope.loading = false;
    $scope.users = users
    .filter(function(user) {
      
      return user.info != null;
    })
    .filter(function(user) {
      
      return user.id !== userInfo.uid;
    });
  });    
  
  $scope.pageTitle = 'Users page';
  $scope.filter = 'show-all';
  $scope.filterUsers = filterUsers;
  
  
  
  function filterUsers(state) {
    
    $scope.filter = state;
    switch(state) {
      
      case 'show-all':
        $scope.users = users.filter(function(user) {
      
          return user.info != null;
        })
        .filter(function(user) {
          
          return user.id !== userInfo.uid;
        });
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
    }
  }
}]