var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');

var RegistrationActions = require('../../../actions/registrationActions');
var RegistrationStore = require('../../../stores/registrationStore');
var classnames = require('classnames');

var validation = require('react-validation-mixin');
var Joi = require('joi');
var strategy = require('joi-validation-strategy');


var SignUpForm = React.createClass({
  mixins: [Router.Navigation, Reflux.connect(RegistrationStore)],

  componentWillMount: function(){
    console.log(this.context.router.getCurrentQuery().token);
    RegistrationActions.fetchEnrollmentRequest(this.context.router.getCurrentQuery().token);
  },

  validatorTypes: {
    firstname: Joi.string().min(2).trim().required().label("First name"),
    lastname: Joi.string().min(2).trim().required().label("Last name"),
    email: Joi.string().email().trim().required().label("E-mail address"),
    phone: Joi.string().required().regex(/(\(?[0-9]{3}\)?|[0-9]{3}).?[0-9]{3}.?[0-9]{4}/, "US phone number").label("Phone"),
    password: Joi.string().min(8).max(127).trim().required().label("Password"),
    passwordconfirmation: Joi.any().valid(Joi.ref('password')).required().label("Password confirmation").options({
      language: {
        any: {
          allowOnly: 'does not match password'
        }
      }
    })
  },

  renderMessage: function(messages, labelText){

    var messageClass = classnames({
      'text-danger': messages.length > 0,
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
      phone: React.findDOMNode(this.refs.phone).value,
      password: React.findDOMNode(this.refs.password).value,
      passwordconfirmation: React.findDOMNode(this.refs.passwordconfirmation).value
    }
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        var registrationParams = {
          firstname: React.findDOMNode(this.refs.firstname).value,
          lastname: React.findDOMNode(this.refs.lastname).value,
          email: React.findDOMNode(this.refs.email).value,
          phone: React.findDOMNode(this.refs.phone).value,
          password: React.findDOMNode(this.refs.password).value
        }
        RegistrationActions.updateEnrollmentRequest(registrationParams, this.context.router.getCurrentQuery().token)
      }
    };

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
                  <input type="text" className="form-control" placeholder="First name" onChange={this.props.handleValidation('firstname')} ref="firstname"/>
                  {this.renderMessage(this.props.getValidationMessages('firstname'), "first name")}
                  <input type="text" className="form-control" placeholder="Last name" onChange={this.props.handleValidation('lastname')} ref="lastname"/>
                  {this.renderMessage(this.props.getValidationMessages('lastname'), "last name")}
                  <input type="text" className="form-control" placeholder="E-mail address" onChange={this.props.handleValidation('email')} ref="email"/>
                  {this.renderMessage(this.props.getValidationMessages('email'), "e-mail")}
                  <input type="text" className="form-control" placeholder="Phone number" onChange={this.props.handleValidation('phone')} ref="phone"/>
                  {this.renderMessage(this.props.getValidationMessages('phone'), "phone")}
                  <input type="password" className="form-control" placeholder="Password" onChange={this.props.handleValidation('password')} ref="password"/>
                  {this.renderMessage(this.props.getValidationMessages('password'), "password")}
                  <input type="password" className="form-control" placeholder="Re-type password" onChange={this.props.handleValidation('passwordconfirmation')} ref="passwordconfirmation"/>
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
