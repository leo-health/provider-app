var Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {Router, Route, hashHistory} = ReactRouter,
    History = require('history'),
    request = require('superagent'),
    LoginActions = require('../actions/loginActions');

module.exports = Reflux.createStore({
  mixins: [History],

  listenables: [LoginActions],

  onLoginRequest: function(loginParam){
    request.post(leo.API_URL+"/provider_login")
           .send(loginParam)
           .end(function(err, res){
             if (res.ok){
               LoginActions.loginRequest.completed(res.body)
             }else{
               LoginActions.loginRequest.failed(res.body)
             }
           })
  },

  onLogoutRequest: function(authenticationToken){
    request.del(leo.API_URL+"/logout")
           .send({ authentication_token: authenticationToken })
           .end(function(err,res){
             if (res.ok){
               LoginActions.logoutRequest.completed(res.body)
             }else{
               LoginActions.logoutRequest.failed(err)
             }
           })
  },

  onLoginRequestCompleted: function(response){
    sessionStorage['authenticationToken']=response.data.session.authentication_token;
    this.trigger(this.getSession());
  },

  onLoginRequestFailed: function(response){
    this.trigger({status: response.status, message: "Invalid email or password"})
  },

  onLogoutRequestCompleted: function(response){
    sessionStorage.removeItem('authenticationToken');
    this.trigger(this.getSession());
  },

  getSession: function(){
    return {isLoggedIn: this.isLoggedIn()}
  },

  isLoggedIn: function(){
    return !!sessionStorage['authenticationToken'];
  }
});
