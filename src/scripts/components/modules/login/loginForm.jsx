var React = require('react');
var LoginAction = require('../../../actions/loginActions');

module.exports = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    var loginParam = {email: this.refs.userEmail, password: this.refs.userPassword}
    LoginAction.loginRequest(loginParam);
  },

  render: function(){
    return(
      <div>
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron text-center">
              <form className="">
                <a href="../" className=""><img src="/images/leo.png" alt="..." /></a>
                <fieldset>
                  <div className="form-group">
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="userEmail"/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="userPassword"/>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox"/> Save password
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-12">
                      <button type="reset" className="btn btn-primary">Login</button>&nbsp;
                      <button type="submit" className="btn btn-default">Forgot?</button>
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
