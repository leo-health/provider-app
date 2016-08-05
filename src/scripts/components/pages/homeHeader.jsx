var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    SessionStore = require('../../stores/sessionStore'),
    UserActions = require('../../actions/userActions'),
    UserStore = require('../../stores/userStore'),
    PracticeStore = require('../../stores/practiceStore'),
    PracticeActions = require('../../actions/practiceActions'),
    LoginActions = require('../../actions/loginActions'),
    SmsSwitch = require('../modules/dropDown/smsSwitch'),
    OnCallSwitch = require('../modules/dropDown/onCallSwitch'),
    leoUtil = require('../../utils/common').StringUtils;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(SessionStore, "onSessionStatusChange"),
    Reflux.listenTo(UserStore, "onUserStatusChange"),
    Reflux.listenTo(PracticeStore, "onPracticeStatusChange")
  ],

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function(){
    return {user: '', oncallProviders: []}
  },

  componentDidMount: function(){
    UserActions.fetchIndividualUserRequest({authentication_token: sessionStorage.authenticationToken});
    this.subscribeToPracticeHourChange();
  },

  subscribeToPracticeHourChange: function() {
    var channel = this.props.pusher.subscribe('practice');
    channel.bind('practice_hour', function(data){
      if(data.practice_id === this.state.user.practice_id){
        var user = this.state.user;
        if(data.status === "open"){
          user.is_practice_open = true;
          user.is_oncall = true
        }else{
          user.is_practice_open = false;
          user.is_oncall = false;
        }
        this.setState({ user: user })
      }
    }, this);
  },

  onPracticeStatusChange: function(status){
   if(status.oncallProviders) this.setState({ oncallProviders: status.oncallProviders })
  },

  onSessionStatusChange: function (status) {
    if(status.isLoggedIn === false) this.context.router.push('/login')
  },

  onUserStatusChange: function(status){
    if(status.self) this.setState({ user: status.self });
  },

  handleOnLogout: function(){
    var authenticationToken = sessionStorage.authenticationToken;
    if(!authenticationToken) return;
    LoginActions.logoutRequest(authenticationToken)
  },

  handleOnClick: function(){
    if(this.state.user.is_practice_open) return;
    PracticeActions.fetchPracticeRequest({
      id: this.state.user.practice_id,
      authentication_token: sessionStorage.authenticationToken
    })
  },

  buttonColor: function(){
    return (this.state.user.is_oncall) ? {color: "green"} : {color: "red"};
  },

  displayUserName: function(){
    return leoUtil.formatName(this.state.user);
  },

  dropDownSelection: function(){
    if(this.state.user.is_practice_open){
      return <SmsSwitch isSms={this.state.user.is_sms}/>
    }else{
      return <OnCallSwitch user={this.state.user} oncallProviders={this.state.oncallProviders}/>
    }
  },

  render: function() {
    if(this.state.user){
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
                    <a onClick={this.handleOnLogout} className="heavy-font-size logout-button collapsed"><i className="fa fa-sign-out fa-lg"></i></a>
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
                    <a className="heavy-font-size navbar-welcome">Welcome, {this.displayUserName()}</a>
                  </li>
                  <li className="dropdown">
                    <a className="dropdown-toggle navbar-dropdown"
                       data-toggle="dropdown"
                       href="#"
                       onClick={this.handleOnClick}
                       role="button"
                       aria-haspopup="true"
                       aria-expanded="false">
                      <i className="fa fa-circle fa-2" aria-hidden="true" style={this.buttonColor()}></i>
                    </a>
                    {this.dropDownSelection()}
                  </li>
                  <li>
                    <a onClick={this.handleOnLogout} className="heavy-font-size cursor"><strong>logout</strong></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return <div></div>
    }
  }
});
