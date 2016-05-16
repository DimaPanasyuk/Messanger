export default
['$firebaseAuth', function auth($firebaseAuth) {
  
  let messanger = new Firebase('https://dima-messanger.firebaseio.com');
  let authentication = $firebaseAuth(messanger);
  
  return {
    
    authStatus,
    authUser,
    unauthUser,
    resetUserPassword,
    registerUser
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
  
  function authUser(user) {
    
    messanger.authWithPassword({
      
      email: user.email,
      password: user.password
    }, function(err, data) {;   
      if (err) {
        
        console.debug('Authentication failed: ', err);
      } else {
        
        console.debug('Authenticated successfully: ', data);
      }
    });
  }
  
  function unauthUser() {
    
    authentication.$unauth();
  }
  
  function resetUserPassword(user) {
    
    messanger.resetPassword({
      
      email: user.email
    }, function(err) {
      
      if (err === null) {
        
        console.debug('Email for password reset sended successfully');
      } else {
        
        console.debug('Error when sending new password for user');
      }
    })
  }
  
  function registerUser(user) {
    
    messanger.createUser({
      
      email: user.email,
      password: user.password
    }, function(error, data) {
      
      if (!error) {
        
        console.debug('User was successfully registered!', data);
      } else {
        
        console.debug('Error while user registration!', error);
      }
    })
  }
}]