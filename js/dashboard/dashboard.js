export default
['$scope', '$rootScope', 
 '$location', 'auth', 'fire', 
 'userInfo', 

function($scope, $rootScope, $location, auth, fire, userInfo) {
  
  let current_page = location.href.split('/'),
      user         = new Firebase(`${fire}/users/${userInfo.uid}`);
  
     
  $scope.logOut = logOut;   
  $scope.setActivePage = setActivePage;
  $scope.activePage = current_page[current_page.length - 1];
  
  function logOut() {
    
    $rootScope.loading = true;
    auth.unauthUser();
    user.update({
      
      lastLoggedOut: (new Date()).getTime()
    })
    $rootScope.loading = false;
    $location.path('/auth');
  }
  
  function setActivePage(page) {
    
    $scope.activePage = page;
  }
}]