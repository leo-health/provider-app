var React = require('react'),
    ReactDom = require('react-dom'),
    Reflux = require('reflux'),
    PasswordActions = require('../../actions/passwordActions'),
    PasswordStore = require('../../stores/passwordStore'),
    ReactRouter = require('react-router'),
    {browserHistory} = ReactRouter,
    SuccessAlert = require('../modules/alert/successAlert'),
    ErrorAlert = require('../modules/alert/errorAlert');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PasswordStore, "onResetChange")],

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
      var email = ReactDom.findDOMNode(this.refs.email).value.trim();
      if (!email) return;
      var resetParam = {email: email};
      PasswordActions.resetPasswordRequest(resetParam)
    }else{
      browserHistory.push('login');
    }
  },

  render: function(){
    return(
      <div className="container page-header resetPasswordForm login-page">
        <div className="row">
          <div className="col-lg-4 login-container text-center">
            <form className="form-group login" onSubmit={this.handleOnSubmit}>
              <a href="../" className="login-logo"><img src="/images/full-leo.png" alt="..." /></a>
              <h6 className="forgot-message">Please enter your @leohealth.com e-mail address and we'll send you a link to reset your password right away!</h6>
              <SuccessAlert message={this.state.message} status={this.state.status}/>
              <ErrorAlert message={this.state.message} status={this.state.status}/>
              <fieldset>
                <div className="form-group login">
                  <span className="fa fa-envelope-o fa-lg"></span>
                  <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                </div>
                <div className="form-group login">
                  <button type="submit" className="btn btn-primary login">{this.state.button}</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
