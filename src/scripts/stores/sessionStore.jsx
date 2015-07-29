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

  onLogoutRequest: function(authentication_token){
    request.del('http://localhost:3000/api/v1/logout')
        .send({authentication_token: authentication_token})
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
    this.trigger(this.getSession());
  },

  onLogoutRequestCompleted: function(response){
    debugger
    localStorage.removeItem("authentication_token");
    localStorage.removeItem("first_name");
    this.trigger(this.getSession());
  },

  getSession: function(){
    return {isLoggedIn: this.isLoggedIn(),
            first_name: localStorage['first_name']}
  },

  isLoggedIn: function(){
    return !!localStorage["authentication_token"];
  }
});
