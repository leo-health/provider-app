var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation;

var LoginActions = require('../actions/loginActions'),
    RouterActions = require('../actions/routerActions');

var SessionStore = require('../stores/sessionStore'),
    RouteStore = require('../stores/routerStore'),
    PasswordStore = require('../stores/passwordStore');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange"), Navigation],

  getInitialState: function(){
    var loginStatus = SessionStore.getSession();
    var currentRouteName = this.context.router.getCurrentPathname();

    if (["/resetPassword", "/changePassword", "/registration", "/success", "/404", "/terms", "/privacy", "/acceptInvitation"].indexOf(currentRouteName) > -1) {
      return loginStatus
    }else if(loginStatus.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }
    return loginStatus;
  },

  onStatusChange: function(status){
    this.setState(status);
    if(this.state.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }
  },

  render: function(){
    return(
      <div className = "container">
        <RouteHandler/>
      </div>
    );
  }
});
