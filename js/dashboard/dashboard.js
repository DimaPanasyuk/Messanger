export default
['$scope', '$rootScope', '$location', 'auth', 

function($scope, $rootScope, $location, auth) {
  
  var current_page = location.href.split('/');  
  $scope.logOut = logOut;   
  $scope.setActivePage = setActivePage;
  $scope.activePage = current_page[current_page.length - 1];
  
  function logOut() {
    
    $rootScope.loading = true;
    auth.unauthUser();
    $rootScope.loading = false;
    $location.path('/auth');
  }
  
  function setActivePage(page) {
    
    $scope.activePage = page;
  }
}]