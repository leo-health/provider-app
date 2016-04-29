var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router');

var LoginActions = require('../actions/loginActions'),
    RouterActions = require('../actions/routerActions');

var SessionStore = require('../stores/sessionStore'),
    RouteStore = require('../stores/routerStore'),
    PasswordStore = require('../stores/passwordStore');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange"), ReactRouter.History],

  getInitialState: function(){
    var loginStatus = SessionStore.getSession();
    var currentRouteName = location.pathname;
    //if (["/resetPassword", "/changePassword", "/registration", "/success", "/404", "/terms", "/privacy", "/acceptInvitation", "/invalid-device"].indexOf(currentRouteName) > -1) {
    //  return loginStatus
    //}else if(loginStatus.isLoggedIn){
    //  this.history.pushState('home')
    //}else{
    //  this.history.pushState('login')
    //}
    return loginStatus;
  },

  onStatusChange: function(status){
    this.setState(status);
    this.state.isLoggedIn ? this.history.pushState('home') : this.history.pushState('login')
  },

  render: function(){
    return(
      <div className = "container">
        {this.props.children}
      </div>
    );
  }
});
