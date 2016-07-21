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
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron text-center">
              <form className="" onSubmit={this.handleOnSubmit}>
                <a href="../" className=""><img src="/images/leo.png" alt="..." /></a>
                <fieldset>
                  <ErrorAlert message={this.state.message} status={this.state.status}/>
                  <div className="form-group">
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password"/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>&nbsp;
                    <button type="button" className="btn btn-default" onClick={this.handleOnForget}>Forgot?</button>
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
