var Reflux = require('reflux');
var React = require('react');
var RegistrationAction = require('../../../actions/registrationActions');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ErrorAlert = require('../alert/errorAlert');

module.exports = React.createClass({
  mixins: [Router.Navigation],

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
  },
  render: function(){
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
            <form className="form-horizontal">
              <div className="text-center">
                <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
                <h4>You have been invited to join Leo.</h4>
              </div>
              <fieldset>
                <div className="form-group">
                  <input type="text" className="form-control" id="inputFirst" placeholder="Pre-filled first name"/>
                  <label for="inputFirst" className="">First name</label>
                  <input type="text" className="form-control" id="inputLast" placeholder="Pre-filled last name"/>
                  <label for="inputLast" className="">Last name</label>
                  <input type="text" className="form-control" id="inputEmail" placeholder="Pre-filled e-mail address"/>
                  <label for="inputEmail" className="">E-mail</label>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                  <label for="inputPassword" className="">Password</label>
                  <input type="password" className="form-control" id="inputPasswordConfirm" placeholder="Retype password"/>
                  <label for="inputPassword" className="">Password confirm</label>
                </div>
                <div className="form-group text-center">
                  <button type="reset" className="btn btn-primary">Sign Up</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
