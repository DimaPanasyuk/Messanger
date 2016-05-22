export default
['$scope', '$rootScope', 'userInfo',
 'fire', '$firebaseArray',

function($scope, $rootScope, userInfo, fire, $firebaseArray) {
  
  $rootScope.loading = true;
  let users_ref = new Firebase(`${fire}/users`),
      users     = $firebaseArray(users_ref);

  users.$loaded(function() {
    
    $rootScope.loading = false;
  });    
  
  $scope.pageTitle = 'Users page';
  $scope.filter = 'show-all';
  $scope.users = users;
  $scope.filterUsers = filterUsers;
  
  
  
  function filterUsers(state) {
    
    $scope.filter = state;
    switch(state) {
      
      case 'show-all':
        $scope.users = users;
        break;
      case 'show-online':
        $scope.users = users.filter(function(user) {
          
          return user.lastLoggedOut === 0;
        })
    }
  }
}]