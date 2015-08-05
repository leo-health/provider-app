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

var Footer = require('./pages/footer');

function getStateFromStores(){
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  }
}

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onSessionChange"), Navigation],

  getInitialState: function(){
    var loginStatus = getStateFromStores();
    var currentRouteName = this.context.router.getCurrentPathname();
    if (currentRouteName=="/resetPassword" || currentRouteName=="/changePassword"){
      return loginStatus
    }
    else if(loginStatus.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }
    return loginStatus;
  },

  onSessionChange: function(status){
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
        <Footer/>
      </div>
    );
  }
});
