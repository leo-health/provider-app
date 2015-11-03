var React = require('react');
var Reflux = require('reflux');
var PasswordActions = require('../../../actions/passwordActions');
var PasswordStore = require('../../../stores/passwordStore');
var Router = require('react-router');
var Navigation = Router.Navigation;
var SuccessAlert = require('../alert/successAlert');
var ErrorAlert = require('../alert/errorAlert');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PasswordStore, "onResetChange"), Navigation],

  getInitialState: function(){
    return{
      status: "initial",
      message: "",
      button: "Submit"
    }
  },

  onResetChange: function(status){
    this.setState(status);
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    if (this.state.button == "Submit" || this.state.button == "Try again"){
      var email = this.refs.email.getDOMNode().value.trim();
      if (!email){
        return
      }
      var resetParam = {email: email};
      PasswordActions.resetPasswordRequest(resetParam)
    }else{
      this.transitionTo('login');
    }
  },

  render: function(){
    return(
      <div className="container page-header resetPasswordForm">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="form-group" onSubmit={this.handleOnSubmit}>
              <a href="../" className=""><img src="/images/leo.png" alt="..." /></a>
              <h6>Please enter your @leohealth.com e-mail address and we will send you a link to reset your password right away!</h6>
              <SuccessAlert message={this.state.message} status={this.state.status}/>
              <ErrorAlert message={this.state.message} status={this.state.status}/>
              <fieldset>
                <div className="form-group">
                  <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                </div>
                <div className="form-group">
                  <div className="col-lg-12">
                    <button type="submit" className="btn btn-primary">{this.state.button}</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
