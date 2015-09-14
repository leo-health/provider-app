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
    request.post('http://leo-api.elasticbeanstalk.com/api/v1/login')
           .send({ email: loginParam.email, password: loginParam.password })
           .end(function(err, res){
             if (res.ok){
               LoginActions.loginRequest.completed(res.body)
             }else{
               LoginActions.loginRequest.failed(res.body)
             }
           })
  },

  onLogoutRequest: function(authenticationToken){
    request.del('http://leo-api.elasticbeanstalk.com/api/v1/logout')
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
    localStorage["authenticationToken"]=response.data.session.authentication_token;
    localStorage["firstName"]=response.data.session.user.first_name;
    localStorage["lastName"]=response.data.session.user.last_name;
    localStorage["title"]=response.data.session.user.title;
    localStorage["email"]=response.data.session.user.email;
    this.trigger(this.getSession());
  },

  onLoginRequestFailed: function(response){
    this.trigger({status: response.status, message: "Invalid email or password"})
  },

  onLogoutRequestCompleted: function(response){
    localStorage.removeItem("authenticationToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("title");
    localStorage.removeItem("email");
    this.trigger(this.getSession());
  },

  getSession: function(){
    return {isLoggedIn: this.isLoggedIn()}
  },

  isLoggedIn: function(){
    return !!localStorage["authenticationToken"];
  }
});
