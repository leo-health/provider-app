var React = require('react');
var Reflux = require('reflux');
var PasswordActions = require('../../../actions/passwordActions');
var PasswordStore = require('../../../stores/passwordStore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PasswordStore, "onStatusChange"), Router.Navigation],

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
      var password = this.refs.password.getDOMNode().value.trim();
      var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value.trim();
      if(password.length < 8){
        this.setState({status: "failed", message: "at least 8 charactors."});
        return
      }else if(!(password === passwordConfirmation)){
        this.setState({status: "failed", message: "password do not match."});
        return
      }else{
        var changeParams = {password: password,
          passwordConfirmation: passwordConfirmation,
          token: this.context.router.getCurrentQuery().token
        };
        PasswordActions.changePasswordRequest(changeParams)
      }
    }else{
      this.transitionTo('login');
    }
  },

  render: function () {
    var showSuccess={display: "none"};
    var showError = {display: "none"};
    if (this.state.status == "failed"){
      showSuccess.display = "none";
      showError.display = "block"
    }else if(this.state.status == "ok"){
      showError.display = "none";
      showSuccess.display="block"
    }
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="form-group has_error" onSubmit={this.handleOnSubmit}>
              <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
              <h6>Please enter your new password.</h6>
              <div className="alert alert-dismissible alert-success" style={showSuccess}>
                <button type="button" className="close" data-dismiss="alert">×</button>
                {this.state.message}
              </div>
              <div className="alert alert-dismissible alert-danger" style={showError}>
                <button type="button" className="close" data-dismiss="alert">×</button>
                {this.state.message}
              </div>
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
