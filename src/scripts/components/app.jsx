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
};

module.exports = React.createClass({
  getInitialState: function(){
    var result = getStateFromStores();

    if(result.isLoggedIn){
      this.transitionTo('home')
    }else{
      this.transitionTo('login')
    }

    return result
  },

  render: function(){
    return(
        <div>
          here is the root
        </div>
    )
  }
});
