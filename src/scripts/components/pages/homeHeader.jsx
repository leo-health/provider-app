var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    SessionStore = require('../../stores/sessionStore'),
    LoginAction = require('../../actions/loginActions'),
    leoUtil = require('../../utils/common').StringUtils;

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange")],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  onStatusChange: function (status) {
    if(status.isLoggedIn === false) this.context.router.push('/login')
  },

  handleOnLogout: function(){
    var authenticationToken = sessionStorage.authenticationToken;
    if(!authenticationToken) return;
    LoginAction.logoutRequest(authenticationToken)
  },

  render: function() {
    var user;
    if(sessionStorage.user) user = leoUtil.formatName(JSON.parse(sessionStorage.user));

    return (
      <div>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse" id="navbar-main">
              <ul className="nav navbar-nav leo-nav">
                <li><a href="../" className="navbar-brand"><img src="../images/leo.png" alt="..." /></a></li>
                <div>
                  <span className="leo-logo leo-logo-orange">leo | </span><span className="leo-logo leo-logo-gray"> messenger</span>
                </div>
              </ul>
              <ul className="nav navbar-nav navbar-right logout-nav ">
                <li>
                  <a className="heavy-font-size navbar-welcome">Welcome, {user}</a>
                </li>
                <li>
                  <a onClick={this.handleOnLogout} className="heavy-font-size logout-button"><strong>logout</strong></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
