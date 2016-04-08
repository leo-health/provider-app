var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var PasswordActions = require('../../../actions/passwordActions');
var PasswordStore = require('../../../stores/passwordStore');
var Router = require('react-router');
var Navigation = Router.Navigation;
var SuccessAlert = require('../alert/successAlert');
var ErrorAlert = require('../alert/errorAlert');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PasswordStore, "onStatusChange"), Navigation],

  getInitialState: function(){
    return{
      status: "initial",
      message: "",
      button: "Submit"
    }
  },

  onStatusChange: function (status) {
    this.setState(status);
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    if(this.state.button == "Submit"){
      var password = ReactDom.findDOMNode(this.refs.password).value.trim();
      var passwordConfirmation = ReactDom.findDOMNode(this.refs.passwordConfirmation).value.trim();
      if(password.length < 8){
        this.setState({status: "fail", message: "The password should be at least 8 characters long."});
        return
      }else if(!(password === passwordConfirmation)){
        this.setState({status: "fail", message: "password do not match."});
        return
      }else{
        var changeParams = {
          password: password,
          passwordConfirmation: passwordConfirmation,
          token: this.context.router.getCurrentQuery().token
        };
        PasswordActions.changePasswordRequest(changeParams)
      }
    }
  },

  render: function () {
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="form-group has_error" onSubmit={this.handleOnSubmit}>
              <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
              <h6>Please enter your new password.</h6>
              <SuccessAlert message={this.state.message} status={this.state.status}/>
              <ErrorAlert message={this.state.message} status={this.state.status}/>
              <fieldset>
                <div className="form-group">
                  <input type="password" className="form-control" id="inputPassword" placeholder="New password" ref="password"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="reInputPassword" placeholder="Re-enter password" ref="passwordConfirmation"/>
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
