var React = require('react');
var Reflux = require('reflux');
var RegistrationAction = require('../../../actions/registrationActions');
var Router = require('react-router').Navigation;
var classnames = require('classnames');

var validation = require('react-validation-mixin');
var Joi = require('joi');
var strategy = require('joi-validation-strategy');


var SignUpForm = React.createClass({
  mixins: [Router.Navigation],

  validatorTypes: {
    firstname: Joi.string().min(2).trim().required().label("First name"),
    lastname: Joi.string().min(2).trim().required().label("Last name"),
    email: Joi.string().email().trim().required().label("E-mail address"),
    password: Joi.string().min(8).max(127).trim().required().label("Password"),
    passwordconfirmation: Joi.any().valid(Joi.ref('password')).required().label("Password confirmation").options({
      language: {
        any: {
          allowOnly: 'does not match password'
        }
      }
    })
  },

  getInitialState: function(){
    return{
      message: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordconfirmation: ""
    }
  },

  renderMessage: function(messages, labelText){
    console.log(messages);
    var messageClass = classnames({
      'text-danger': messages.length !== 0,
      'text-muted': messages.length === 0
    });
    var labelToShow = (messages.length === 0 ? labelText : messages[0]);
    return <label className={messageClass}>{labelToShow}</label>
  },

  getValidatorData: function(){
    return {
      firstname: React.findDOMNode(this.refs.firstname).value,
      lastname: React.findDOMNode(this.refs.lastname).value,
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value,
      passwordconfirmation: React.findDOMNode(this.refs.passwordconfirmation).value
    }
  },

  handleOnSubmit: function (e) {
    e.preventDefault();

    var onValidate = function(error, validationErrors) {
      if(error){
        console.log(error);
      } else {
        console.log(this.props.errors)
      }


    }
    this.props.validate(onValidate);

  },
  render: function(){
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
            <form className="form-horizontal" onSubmit={this.handleOnSubmit}>
              <div className="text-center">
                <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
                <h4>You have been invited to join Leo.</h4>
              </div>
              <fieldset>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="First name" onBlur={this.props.handleValidation('firstname')} ref="firstname"/>
                  {this.renderMessage(this.props.getValidationMessages('firstname'), "first name")}
                  <input type="text" className="form-control" id="inputLast" placeholder="Last name" onBlur={this.props.handleValidation('lastname')} ref="lastname"/>
                  {this.renderMessage(this.props.getValidationMessages('lastname'), "last name")}
                  <input type="text" className="form-control" id="inputEmail" placeholder="E-mail address" onBlur={this.props.handleValidation('email')} ref="email"/>
                  {this.renderMessage(this.props.getValidationMessages('email'), "e-mail")}
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" onBlur={this.props.handleValidation('password')} ref="password"/>
                  {this.renderMessage(this.props.getValidationMessages('password'), "password")}
                  <input type="password" className="form-control" id="inputPasswordConfirm" placeholder="Re-type password" onBlur={this.props.handleValidation('passwordconfirmation')} ref="passwordconfirmation"/>
                  {this.renderMessage(this.props.getValidationMessages('passwordconfirmation'), "password confirmation")}
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = validation(strategy)(SignUpForm);
