var React = require('react'),
    Reflux = require('reflux'),
    SessionStore = require('../../stores/sessionStore'),
    UserActions = require('../../actions/userActions'),
    UserStore = require('../../stores/userStore'),
    PracticeStore = require('../../stores/practiceStore'),
    PracticeActions = require('../../actions/practiceActions'),
    LoginActions = require('../../actions/loginActions'),
    SmsSwitch = require('../modules/dropDown/smsSwitch'),
    OnCallSwitch = require('../modules/dropDown/onCallSwitch'),
    leoUtil = require('../../utils/common').StringUtils,
    _ = require('lodash');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(SessionStore, "onSessionStatusChange"),
    Reflux.listenTo(UserStore, "onUserStatusChange"),
    Reflux.listenTo(PracticeStore, "onPracticeStatusChange")
  ],

  contextTypes: { router: React.PropTypes.object.isRequired },

  getInitialState: function(){
    return { user: '', oncallProviders: [], isPracticeOpen: '' }
  },

  componentDidMount: function(){
    UserActions.fetchIndividualUserRequest({ authentication_token: sessionStorage.authenticationToken });
    this.subscribeToOncallChange();
  },

  subscribeToOncallChange: function() {
    var channel = this.props.pusher.subscribe('staff');
    channel.bind('oncall_change', function(data){
      var user = this.state.user;
      if(_.indexOf(data.staff_ids, user.id) != -1) user.is_oncall = (data.event === 'on-call');
      this.setState({ user: user })
    }, this);
  },

  onPracticeStatusChange: function(status){
    if( status.data.is_practice_open !== undefined ){
      if(!status.data.is_practice_open) this.fetchOnCallProviders();
      this.setState({ isPracticeOpen: status.data.is_practice_open });
    }

    if( status.data.practice ){
      var oncallProviders = [];
      _.forEach(status.data.practice.on_call_providers, function(provider){ oncallProviders.push(provider) });
      this.setState({ oncallProviders: oncallProviders });
    }
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

  fetchOnCallProviders: function(){
    PracticeActions.fetchPracticeRequest({
      id: this.state.user.practice_id,
      authentication_token: sessionStorage.authenticationToken
    })
  },

  checkIsPracticeOpen: function(){
    PracticeActions.fetchPracticeRequest({
      id: this.state.user.practice_id,
      authentication_token: sessionStorage.authenticationToken,
      schedule_check: true
    })
  },

  buttonColor: function(){
    return (this.state.user.is_oncall) ? {color: "#63CF9B"} : {color: "#FF906A"};
  },

  displayUserName: function(){
    return leoUtil.formatName(this.state.user);
  },

  dropDownSelection: function(){
    if(this.state.isPracticeOpen){
      return <SmsSwitch isSms={this.state.user.sms_enabled}/>
    }else if(!!this.state.oncallProviders){
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
                  <ul className="nav navbar-nav leo-logo collapsed">
                    <li><a href="../" className="navbar-brand pulse"><img src="../images/leo.png" alt="..." /></a></li>
                    <div>
                      <span className="leo-logo leo-logo--collapsed leo-logo-gray">messenger </span>
                    </div>
                  </ul>
                  <ul className="nav navbar-nav collapsed navbar-right logout-nav logout-nav--collapsed">
                    <li className="dropdown navbar-dropdown-collapsed status-menu">
                      <a href="#"
                         className="dropdown-toggle navbar-dropdown-collapsed"
                         data-toggle="dropdown"
                         onClick={this.checkIsPracticeOpen}
                         role="button">
                        <i className="fa fa-circle" aria-hidden="true" style={this.buttonColor()}></i>
                        <i className="fa fa-caret-down navbar-dropdown-collapsed" aria-hidden="true"></i>
                      </a>
                      {this.dropDownSelection()}
                    </li>
                    <li className="dropdown navbar-dropdown-collapsed logout-menu">
                      <a href="#"
                         className="dropdown-toggle navbar-dropdown-collapsed"
                         data-toggle="dropdown"
                         role="button"
                         aria-expanded="false">
                        <span className="glyphicon glyphicon-option-vertical cursor"></span>
                      </a>
                      <ul className="dropdown-menu" id="logout-dropdown-mobile">
                        <li className="logout-button collapsed">
                          <span>Logout </span>
                          <i onClick={this.handleOnLogout} className="fa fa-sign-out fa-lg cursor"></i>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="navbar-collapse collapse" id="navbar-main">
                <ul className="nav navbar-nav leo-logo full-logo">
                  <li><a href="../" className="navbar-brand pulse"><img src="../images/full-leo-header.png" alt="..." /></a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right logout-nav">
                  <li className="dropdown">
                    <a className="dropdown-toggle"
                       data-toggle="dropdown"
                       href="#"
                       onClick={this.checkIsPracticeOpen}
                       role="button">
                      <i className="fa fa-circle" aria-hidden="true" style={this.buttonColor()}></i>
                      <i className="fa fa-caret-down navbar-dropdown-collapsed" aria-hidden="true"></i>
                    </a>
                    {this.dropDownSelection()}
                  </li>
                  <li>
                    <a className="heavy-font-size navbar-welcome">Welcome, {this.displayUserName()}</a>
                  </li>
                  <li>
                    <a onClick={this.handleOnLogout} className="heavy-font-size cursor"><strong>logout</strong></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      )
    }else{
      return <div></div>
    }
  }
});
