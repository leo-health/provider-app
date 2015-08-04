var Reflux = require('reflux');
var React = require('react');
var LoginAction = require('../../../actions/loginActions');
var SessionStore = require('../../../stores/sessionStore');
var Router = require('react-router');
var Navigation = Router.Navigation;

module.exports = React.createClass({
  mixins: [Reflux.listenTo(SessionStore, "onStatusChange"), Navigation],

  getInitialState: function(){
    return{
      status: "initial",
      message: ""
    }
  },

  onStatusChange: function (status) {
    this.setState(status);
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if (!email || !password){
      return
    }
    var loginParam = {email: email, password: password};
    LoginAction.loginRequest(loginParam);
  },

  handleOnForget: function(){
    this.transitionTo('resetPassword');
  },

  render: function(){
    var showError = {display: "none"};
    if (this.state.status == "fail"){
      showError.display = "block"
    }

    return(
      <div>
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron text-center">
              <form className="" onSubmit={this.handleOnSubmit}>
                <a href="../" className=""><img src="/images/leo.png" alt="..." /></a>
                <div className="alert alert-dismissible alert-danger" style={showError}>
                  <button type="button" className="close" data-dismiss="alert">×</button>
                  {this.state.message}
                </div>
                <fieldset>
                  <div className="form-group">
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password"/>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/> Save password
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-primary">Login</button>&nbsp;
                      <button type="button" className="btn btn-default" onClick={this.handleOnForget}>Forgot?</button>
                    </div>
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
