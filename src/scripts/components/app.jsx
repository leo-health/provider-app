var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var LoginActions = require('../actions/loginActions');
var RouterActions = require('../actions/routerActions');

var SessionStore = require('../stores/sessionStore');
var RouteStore = require('../stores/routerStore');
var PasswordStore = require('../stores/passwordStore');

function getStateFromStores(){
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  }
}

function loginOrOut(status){
  if(status.isLoggedIn){
    this.transitionTo('home')
  }else{
    this.transitionTo('login')
  }
}

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onSessionChange")],

  onSessionChange: function(status){
    this.setState({
      currentStatus: status
    });
    loginOrOut(this.state);
  },

  getInitialState: function(){
    result = getStateFromStores();
    debugger
    this.setState({
      isLoggedIn: result.isLoggedIn
      //email: result.email
    });
    loginOrOut(this.state);
    return this.state
  },


  //onLogout: function () {
  //  LoginActions.logoutRequest();
  //},

  render: function(){
    debugger
    if (this.state.isLoggedIn){
      var loginFields = (
        <div>
          logout button
        </div>
      )
    }else{
      var loginFields = (
        <div>
          login button
        </div>
      )
    }

    return(
      <div className = "container">
        <RouteHandler/>
      </div>
    );
  }
});
