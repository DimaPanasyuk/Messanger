export default
['$scope', '$rootScope', function($scope, $rootScope) {
  
  
  $scope.sortType = 'date';
  $scope.reverse = true;
  $rootScope.loading = true;
  
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
    $rootScope.loading = false;
    $rootScope.$digest();
  })
  
  function setSortBy(type) {
    
    $scope.sortType = type;
    $scope.reverse  = !$scope.reverse;
  }
}]