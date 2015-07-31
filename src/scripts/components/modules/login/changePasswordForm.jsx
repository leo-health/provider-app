var React = require('react');
var Reflux = require('reflux');
var PasswordActions = require('../../../actions/passwordActions');
var PasswordStore = require('../../../stores/passwordStore');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PasswordStore, "onStatusChange")],

  getInitialState: function(){
    return{
      status: "initial"
    }
  },

  onStatusChange: function (status) {
    this.setState(status);

    if (this.state.status == "ok"){

    }
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var password = this.refs.password.getDOMNode().value.trim();
    var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value.trim();
    if(password.length < 8){
      return
    }else if(!(password === passwordConfirmation)){
      this.setState({status: "failed", message: "hahaha"});
      return
    }
    var changeParams = {password: password, passwordConfirmation: passwordConfirmation };
    PasswordActions.changePassowrdRequest(changeParams)
  },

  render: function () {
    var classNames = require('classnames');
    var classes = ['form-group', {has_error: this.state.status == "failed"}];
    var showError = {display: "none"};
    if (this.state.status == "fail"){
      showError.display = "block"
    }
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="form-group has_error" onSubmit={this.handleOnSubmit}>
              <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
              <h6>Please enter your new password.</h6>
              <div className="alert alert-dismissible alert-danger" style={showError}>
                <button type="button" className="close" data-dismiss="alert">×</button>
                <a href="#" className="alert-link">{this.state.message}</a>
              </div>
              <fieldset>
                <div className={classes}>
                  <input type="password" className="form-control" id="inputPassword" placeholder="New password" ref="password"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="reInputPassword" placeholder="Re-enter password" ref="passwordConfirmation"/>
                </div>
                <div className="form-group">
                  <div className="col-lg-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
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
