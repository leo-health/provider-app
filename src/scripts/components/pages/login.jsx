var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    ReactDom = require('react-dom'),
    LoginAction = require('../../actions/loginActions'),
    SessionStore = require('../../stores/sessionStore'),
    Helper = require('../../utils/registrationHelper');
    ErrorAlert = require('../modules/alert/errorAlert');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange")],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return { status: '', message: '' }
  },

  onStatusChange: function (status) {
    if(status.isLoggedIn){
      this.context.router.push('/home');
      return
    }
    this.setState(status);
  },

  componentDidMount: function(){
    if(!this.isSessionStorageNameSupported()){
      this.setState({
        status: "error",
        message: "The provider app is not supported for use in private browsing modes."
      });
    }
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var sessionInfo = Helper.browserDetect();
    var email = ReactDom.findDOMNode(this.refs.email).value.trim();
    var password = ReactDom.findDOMNode(this.refs.password).value.trim();
    if (!this.isSessionStorageNameSupported() || !email || !password) return;
    LoginAction.loginRequest({
      email: email,
      password: password,
      os_version: sessionInfo.osVersion,
      platform: sessionInfo.platform,
      device_type: sessionInfo.deviceType
    });
  },

  handleOnForget: function(){
    if(this.isSessionStorageNameSupported()){
      this.context.router.push('/resetPassword');
    }
  },

  isSessionStorageNameSupported: function (){
    var testKey = 'test', storage = window.sessionStorage;
    try {
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return true
    }
    catch (error) {
      return false;
    }
  },

  render: function(){
    return(
      <div>
        <div className="container page-header login-page">
          <div className="row">
            <div className="col-lg-4 text-center login-container">
              <form className="" onSubmit={this.handleOnSubmit}>
                <a href="../" className="login-logo"><img src="/images/full-leo.png" alt="..." /></a>
                <p className="login-message">Login to your account</p>
                <fieldset>
                  <ErrorAlert message={this.state.message} status={this.state.status}/>
                  <div className="form-group login">
                    <span className="fa fa-envelope-o fa-lg"></span>
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                  </div>
                  <div className="form-group login">
                    <span className="fa fa-lock fa-lg"></span>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password"/>
                    <p onClick={this.handleOnForget} className="login-forgot cursor">Did you forget your password?</p>
                  </div>
                  <div className="form-group login">
                    <button type="submit" className="btn btn-primary btn-lg login">Login</button>&nbsp;
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
