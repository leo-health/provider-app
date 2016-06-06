var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory} = ReactRouter,
    LoginActions = require('../actions/loginActions'),
    SessionStore = require('../stores/sessionStore');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange")],

  getInitialState: function(){
    return SessionStore.getSession();
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount: function(){
    var currentRouteName = this.props.location.pathname;
    if (["/resetPassword", "/changePassword", "/registration", "/success", "/404", "/terms", "/privacy", "/acceptInvitation", "/invalid-device", "/signup", "/signup/", "/registation-success"].indexOf(currentRouteName) > -1) return;
    this.pageTransition();
  },

  onStatusChange: function(status){
    this.setState(status);
    this.pageTransition();
  },

  pageTransition: function(){
    this.state.isLoggedIn ? this.context.router.push('/home') : this.context.router.push('/login');
  },

  render: function(){
    return(
      <div className = "container">
        {this.props.children}
      </div>
    );
  }
});
