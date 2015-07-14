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
        <div class="container page-header">
          <div class="row">
            <div class="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
              <form class="">
                <a href="../" class=""><img src="/images/leo.png" alt="..." /></a>
                <fieldset>
                  <div class="form-group">
                    <input type="text" class="form-control" id="inputEmail" placeholder="Email" ref="userEmail"/>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" ref="userPassword"/>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox"/> Save password
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-lg-10">
                      <button type="reset" class="btn btn-primary">Login</button>
                      <button type="submit" class="btn btn-default">Forgot?</button>
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
