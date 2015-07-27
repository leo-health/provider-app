var Reflux = require('reflux'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation,
    router = require('../components/router'),
    request = require('superagent'),
    LoginActions = require('../actions/loginActions');

module.exports = Reflux.createStore({
  mixins: [Router.Navigation],

  listenables: [LoginActions],

  redirectHome: function(){

  },

  onLoginRequest: function(loginParam){
    request.post('http://localhost:3000/api/v1/login')
        .send({email: loginParam.email, password: loginParam.password})
        .end(function(err, res){
          if (res.ok){
            LoginActions.loginRequest.completed(res.body)
          }else{
            LoginActions.loginRequest.failed(err)
          }
        })
  },

  onLoginRequestCompleted: function(response){
    console.log('hi I am here now');
    debugger
    router.transitionTo('home');
    this.redirectHome();
  },

  onLogoutRequest: function(authentication_token){
    request.post('http://localhost:3000/api/v1/logout')
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
  }
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
