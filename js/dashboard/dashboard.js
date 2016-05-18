export default
['$scope', '$rootScope', '$location', 'auth',
 '$resource', 

function($scope, $rootScope, $location, auth, $resource) {
  
  
  $scope.sortType = 'date';
  $scope.reverse = true;
  
  $scope.logOut = logOut;
  $scope.setSortBy = setSortBy;
  
  
  function getWall() {
    
    return new Promise(function(resolve, reject) {
      
      VK.api('wall.get', {domain: 'forwebdev', count: 20}, function(data) {
    
        if (data.response) {
          resolve(data.response);
        }    
      })
    })
  }
  
  getWall()
  .then(function(data) {
    console.debug(data);
    $scope.posts = data.slice(1);
    $rootScope.$digest();
  })
  
  //mocked data
  // $scope.posts = [
    
  //   {
  //     title: 'Post - 1',
  //     content: 'This is post 1 conent',
  //     date: (new Date()).getTime() - 9877,
  //     rating: 6
  //   },
  //   {
  //     title: 'Post - 2',
  //     content: 'This is post 2 conent',
  //     date: (new Date()).getTime() - 6233,
  //     rating: 5
  //   },
  //   {
  //     title: 'Post - 3',
  //     content: 'This is post 3 conent',
  //     date: (new Date()).getTime() + 5223,
  //     rating: 2
  //   },
  //   {
  //     title: 'Post - 4',
  //     content: 'This is post 4 conent',
  //     date: (new Date()).getTime(),
  //     rating: 8
  //   }
  // ]
  
  function setSortBy(type) {
    
    $scope.sortType = type;
    $scope.reverse  = !$scope.reverse;
  }
  
  
  function logOut() {
    
    $rootScope.loading = true;
    auth.unauthUser();
    $rootScope.loading = false;
    $location.path('/auth');
  }
}]