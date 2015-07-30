var React = require('react');
var PasswordActions = require('../../../actions/passwordActions');

module.exports = React.createClass({
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
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="" onSubmit={this.handleOnSubmit}>
              <a href="../" className=""><img src="/images/leo.png" alt="..." /></a>
              <h6>Please enter your @leohealth.com e-mail address and we will send you a link to reset your password right away!</h6>
              <fieldset>
                <div className="form-group">
                  <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                </div>
                <div className="form-group">
                  <div className="col-lg-8">
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
