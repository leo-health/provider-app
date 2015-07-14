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
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  }
}

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onSessionChange"), Navigation],

  onSessionChange: function(status){
    this.setState(status);
    if(this.state.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }
  },

  getInitialState: function(){
    var loginStatus = getStateFromStores();
    if(loginStatus.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }
    return loginStatus;
  },

  render: function(){
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
        <Footer/>
      </div>
    );
  }
});
