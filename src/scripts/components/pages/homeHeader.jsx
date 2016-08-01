var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    SessionStore = require('../../stores/sessionStore'),
    LoginAction = require('../../actions/loginActions'),
    SmsSwitch = require('../modules/dropDown/smsSwitch'),
    OnCallSwitch = require('../modules/dropDown/onCallSwitch'),
    leoUtil = require('../../utils/common').StringUtils;

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange")],

  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function(){
    return {isOncall: this.props.user.is_oncall, isPracticeOpen: this.props.user.is_practice_open}
  },

  componentDidMount: function(){
    this.subscribeToPusher();
  },

  subscribeToPusher: function() {
    var channel = this.props.pusher.subscribe('practice');
    channel.bind('practice_hour', function(data){
      if(data.practice_id === this.props.user.practice_id){
        data.status === 'open' ? this.setState({isPracticeOpen: true}) : this.setState({isPracticeOpen: false})
      }
    }, this);
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
    return (this.state.isOncall || this.state.isPracticeOpen) ? {color: "green"} : {color: "red"};
  },

  displayUserName: function(){
    return leoUtil.formatName(this.props.user);
  },

  dropDownSelection: function(){
    if(this.state.isPracticeOpen){
      return <SmsSwitch buttonColor={this.buttonColor()}/>
    }else{
      return <OnCallSwitch buttonColor={this.buttonColor()}/>
    }
  },

  render: function() {
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
              <ul className="nav navbar-nav navbar-right logout-nav">
                <li>
                  <a className="heavy-font-size navbar-welcome">Welcome, {this.displayUserName()}</a>
                </li>
                {this.dropDownSelection()}
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
