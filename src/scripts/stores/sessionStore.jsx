var Reflux = require('reflux'),
    LoginActions = require('../actions/loginActions'),
    request = require('superagent');


module.exports = Reflux.createStore({
  listenalbes: LoginActions,

  onLoginRequest: function(email, password){
    console.log('before sending request')
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
  },

  isLoggedIn: function(){
    //!!this.getAuthenticationToken()
    return false
  },

  getEmail: function(){
    //this.getLocalStorageObj()['email']
    return 'wuang@leohealth.com'
  },
});


//
//getId: function () {
//  this.getLocalStorageObj()['id']
//},
//
//getErrors: function() {
//  this.errors
//},
//
//getLocalStorageObj: function(){
//  //get the input data from the login form
//},
//getAuthenticationToken: function(){
//  this.getLocalStorageObj()['authentication_token']
//},
//
