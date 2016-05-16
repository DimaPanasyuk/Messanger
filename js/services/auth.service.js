
auth.$inject = [
  
  '$firebaseAuth'
]

function auth($firebaseAuth) {
  
  let user = new Firebase('https://dima-messanger.firebaseio.com');
  let authentication = $firebaseAuth(user);
  
  return {
    
    //status: authStatus,
    authPassword: authPass,
    unauth: unauth
  }
  
  function authStatus() {
    
    authentication.$onAuth(function(data) {
      
      if (data) {
        
        return true;
      } else {
        
        return false;
      }
    })   
  }
  
  function authPass(user) {
    
    user.authWithPassword({
      
      email: user.email,
      password: user.password
    })
    .then(function(data) {
      
      console.debug('Authenticated successfully: ', data);
    })
    .catch(function(err) {
      
      console.debug('Login Failed', err);
    })
  }
  
  function unauth() {
    
    user.$unauth();
  }
}

export default user;