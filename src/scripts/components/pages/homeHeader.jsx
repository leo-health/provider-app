var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    SessionStore = require('../../stores/sessionStore'),
    LoginAction = require('../../actions/loginActions'),
    leoUtil = require('../../utils/common').StringUtils;

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange")],

  getInitialState: function(){
    return { online: true }
  },

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

  buttonColor: function(){
    //this.pros.isOfficeHour
    return this.state.online ? {color: "green"} : {color: "red"};
  },

  render: function() {
    var user;
    if(sessionStorage.user) user = leoUtil.formatName(JSON.parse(sessionStorage.user));

    return (
      <div>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
            <ul className="nav navbar-nav leo-nav collapsed">
                  <li><a href="../" className="navbar-brand pulse"><img src="../images/leo-light.png" alt="..." /></a></li>
                  <div>
                    <span className="leo-logo leo-logo--collapsed leo-logo-gray">messenger </span>
                  </div>
              </ul>
              <ul className="nav navbar-nav navbar-right logout-nav logout-nav--collapsed">
                <li>
                  <a onClick={this.handleOnLogout} className="heavy-font-size logout-button collapsed"><strong>logout</strong></a>
                </li>
              </ul>

            </div>
            <div className="navbar-collapse collapse" id="navbar-main">
              <ul className="nav navbar-nav leo-nav">
                <li><a href="../" className="navbar-brand pulse"><img src="../images/leo-light.png" alt="..." /></a></li>
                <div>
                  <span className="leo-logo orange-font">leo | </span><span className="leo-logo leo-logo-gray"> messenger</span>
                </div>
              </ul>
              <ul className="nav navbar-nav navbar-right logout-nav ">
                <li>
                  <a className="heavy-font-size navbar-welcome">Welcome, {user}</a>
                </li>
                <li className="dropdown">
                  <a className="dropdown-toggle navbar-dropdown" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-circle fa-2" aria-hidden="true" style={this.buttonColor()}></i>
                  </a>
                  <ul className="dropdown-menu row">
                    <li className="col-lg-12"><h5>Your are online and the practice is open</h5></li>
                    <li className="col-lg-offset-1 col-lg-10"><h7>Away from your desk? Get Alerts on your phone</h7></li>
                    <li className="col-lg-offset-2 col-lg-8"><button className="full-width-button">Turn On</button></li>
                  </ul>
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
