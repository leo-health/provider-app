var Reflux = require('reflux'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation,
    request = require('superagent'),
    LoginActions = require('../actions/loginActions');

module.exports = Reflux.createStore({
  mixins: [Router.Navigation],

  listenables: [LoginActions],

  onLoginRequest: function(loginParam){
    request.post('http://localhost:3000/api/v1/login')
           .send({ email: loginParam.email, password: loginParam.password })
           .end(function(err, res){
             if (res.ok){
               LoginActions.loginRequest.completed(res.body)
             }else{
               LoginActions.loginRequest.failed(res.body)
             }
           })
  },

  onLogoutRequest: function(authentication_token){
    request.del('http://localhost:3000/api/v1/logout')
           .send({ authentication_token: authentication_token })
           .end(function(err,res){
             if (res.ok){
               LoginActions.logoutRequest.completed(res.body)
             }else{
               LoginActions.logoutRequest.failed(err)
             }
           })
  },

  onLoginRequestCompleted: function(response){
    localStorage["authentication_token"]=response.data.session.authentication_token;
    localStorage["first_name"]=response.data.session.user.first_name;
    localStorage["last_name"]=response.data.session.user.last_name;
    localStorage["title"]=response.data.session.user.title;
    this.trigger(this.getSession());
  },

  onLoginRequestFailed: function(response){
    this.trigger({status: response.status, message: "Invalid email or password"})
  },

  onLogoutRequestCompleted: function(response){
    localStorage.removeItem("authentication_token");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("title");
    this.trigger(this.getSession());
  },

  getSession: function(){
    return {isLoggedIn: this.isLoggedIn()}
  },

  isLoggedIn: function(){
    return !!localStorage["authentication_token"];
  }
});
