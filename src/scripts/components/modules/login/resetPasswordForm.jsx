var React = require('react');
var Reflux = require('reflux');
var PasswordActions = require('../../../actions/passwordActions');
var PasswordStore = require('../../../stores/passwordStore');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PasswordStore, "onStatusChange")],

  getInitialState: function(status){
    return{
      message: ""
    }
  },

  onStatusChange: function(status){
    this.setState(status);
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    if (!email){
      return
    }
    var resetParam = {email: email};
    PasswordActions.resetPasswordRequest(resetParam)
  },

  render: function(){
    var SucessAlert = {display: 'none'};
    var ErrorAlert = {display: 'none'};

    if(this.state.status == "ok"){
      ErrorAlert.display = 'none';
      SucessAlert.display = 'block';
    }else if(this.state.status == "fail"){
      SucessAlert.display = 'none';
      ErrorAlert.display = 'block';
    }

    return(
      <div className="container page-header resetPasswordForm">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="" onSubmit={this.handleOnSubmit}>
              <a href="../" className=""><img src="/images/leo.png" alt="..." /></a>
              <h6>Please enter your @leohealth.com e-mail address and we will send you a link to reset your password right away!</h6>
              <div className="alert alert-dismissible alert-success" style={SucessAlert}>
                <button type="button" className="close" data-dismiss="alert">×</button>
                {this.state.message}
              </div>

              <div className="alert alert-dismissible alert-danger" style={ErrorAlert}>
                <button type="button" className="close" data-dismiss="alert">×</button>
                {this.state.message}
              </div>

              <fieldset>
                <div className="form-group">
                  <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                </div>
                <div className="form-group">
                  <div className="col-lg-12">
                    <button type="submit" className="btn btn-primary">Sumbit</button>
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
