var Reflux = require('reflux');
LoginActions = require('../actions/loginActions');


module.exports = Reflux.createStore({
  //init: function () {
  //  this.listenToMany(actions)
  //},

  listenalbes: LoginActions,

  isLoggedIn: function(){
    !!this.getAuthenticationToken()
  },

  getAuthenticationToken: function(){
    this.getLocalStorageOjb()['authentication_token']
  },

  getEmail: function(){
    this.getLocalStorageObj()['email']
  },

  getId: function () {
    this.getLocalStorageObj()['id']
  },

  getErrors: function() {
    this.errors
  },

  getLocalStorageObj: function(){
    //get the input data from the login form
  },

  onLoginRequest: function(email, password){
    request.post('/api/v1/login')
     .send({email: email, password: password})
     .end(function(err, res){
          if (res.ok){
            loginRequest.completed(res.body)
          }else{
            loginRequest.failed(err)
          }
        })
  },

  onLogoutRequest: function(authentication_token){
   request.post('/api/v1/logout')
    .send({authentication_token: authentication_token})
    .end(function(err,res){
         if (res.ok){
           logoutResquest.completed(res.body)
         }else{
           logoutResquest.failed(err)
         }
       })
  }
});
