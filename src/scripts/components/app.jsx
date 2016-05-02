var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory} = ReactRouter;

var LoginActions = require('../actions/loginActions'),
    RouterActions = require('../actions/routerActions');

var SessionStore = require('../stores/sessionStore'),
    RouteStore = require('../stores/routerStore'),
    PasswordStore = require('../stores/passwordStore');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange")],

  getInitialState(){
    return{
      loggedIn: SessionStore.getSession().isLoggedIn
    }
  },

  onStatusChange: function(status){
    this.setState(status);
    this.state.loggedIn ? browserHistory.push('home') : browserHistory.push('login')
  },

  render: function(){
    return(
      <div className = "container">
        {this.props.children}
      </div>
    );
  }
});
