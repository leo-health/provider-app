var React = require('react/addons');
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

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onSessionChange")],

  loginOrOut: function(status){
    if(status.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }
  },

  getInitialState: function(){
    this.setState({
      currentStatus: getStateFromStores()
    });
    loginOrOut(this.state);
    return this.state
  },

  onSessionChange: function(status){
    this.setState({
      currentStatus: status
    });
    loginOrOut(this.state);
  },

  onLogout: function () {
    LoginActions.logoutRequest();
  },

  render: function(){
    if (this.state.isLoggedIn){
      var loginFields = (
          <span>
          <a href="#" onClick={this.handleOnLogout}>
            <span>
              Logout
            </span>
          </a>
          <span>Hi, {this.state.email}</span>
        </span>
      )
    }else{
      var loginFields = (
        <div>here should redirect to login</div>
      )
    }

    return(
      <div className = "container">
        <RouteHandler/>
      </div>
    );
  }
});
