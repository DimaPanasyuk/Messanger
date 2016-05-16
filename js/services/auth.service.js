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
        
    return new Promise(function(resolve, reject) {
      
      authentication.$authWithPassword({
    
        email: user.email,
        password: user.password
      })
      .then(function(data) {
        
        resolve(data);
      })
      .catch(function(data) {
        
        resolve(data);
      }) 
    })        
  }
  
  function unauthUser() {
    
    authentication.$unauth();
  }
  
  function resetUserPassword(user) {
    
    return new Promise(function(resolve, reject) {
      
      authentication.$resetPassword({
      
        email: user.email
      })
      .then(function(data) {
        
        resolve(data);
      })
      .catch(function(data) {
        
        resolve(data);
      })
    })
  }
  
  function registerUser(user) {
   
    return new Promise(function(resolve, reject) {

      authentication.$createUser({
      
        email: user.email,
        password: user.password
      })
      .then(function(data) {
        
        resolve(data)
      })
      .catch(function(data) {
        
        resolve(data);
      })
    })
    
  }
}]