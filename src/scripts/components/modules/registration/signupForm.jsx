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
  mixins: [Router.Navigation, Reflux.listenTo(RegistrationStore, "commonCallback")],

  componentWillMount: function(){
    RegistrationActions.fetchEnrollmentRequest(this.context.router.getCurrentQuery().token);
  },

  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    email: Joi.string().required().regex(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
    phone: Joi.string().required().regex(/(\(?[0-9]{3}\)?|[0-9]{3}).?[0-9]{3}.?[0-9]{4}/, "US phone number").label("Phone"),
    password: Joi.string().min(8).max(127).trim().required().label("Password"),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().label("Password confirmation").options({
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

  commonCallback: function(response){

    if(response.status != "error"){
      switch(response.action) {
        case "fetch": {
          this.setState({
            firstName: response.data.user.first_name,
            lastName: response.data.user.last_name,
            email: response.data.user.email});
          break;
        } case "update": {
          this.transitionTo("success");
          break;
        }
        case "convert": {
          this.transitionTo("success");
          break;
        }
        default: {
          break;
        }
      }
    }else{
      this.transitionTo("success");
    }
  },

  getInitialState: function() {
    return({
      firstName: "",
      lastName: "",
      email: ""
    })
  },

  getValidatorData: function(){
    return {
      firstName: React.findDOMNode(this.refs.firstName).value,
      lastName: React.findDOMNode(this.refs.lastName).value,
      email: React.findDOMNode(this.refs.email).value,
      phone: React.findDOMNode(this.refs.phone).value,
      password: React.findDOMNode(this.refs.password).value,
      passwordConfirmation: React.findDOMNode(this.refs.passwordConfirmation).value
    }
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return;
      } else {
        var registrationParams = {
          firstName: React.findDOMNode(this.refs.firstName).value,
          lastName: React.findDOMNode(this.refs.lastName).value,
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
                  <input type="text" className="form-control" placeholder="First name" value={this.state.firstName} onChange={this.props.handleValidation('firstName')} ref="firstName"/>
                  {this.renderMessage(this.props.getValidationMessages('firstName'), "first name")}
                  <input type="text" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.props.handleValidation('lastName')} ref="lastName"/>
                  {this.renderMessage(this.props.getValidationMessages('lastName'), "last name")}
                  <input type="text" className="form-control" placeholder="E-mail address" value={this.state.email} onChange={this.props.handleValidation('email')} ref="email"/>
                  {this.renderMessage(this.props.getValidationMessages('email'), "e-mail")}
                  <input type="text" className="form-control" placeholder="Phone number" onChange={this.props.handleValidation('phone')} ref="phone"/>
                  {this.renderMessage(this.props.getValidationMessages('phone'), "phone")}
                  <input type="password" className="form-control" placeholder="Password" onChange={this.props.handleValidation('password')} ref="password"/>
                  {this.renderMessage(this.props.getValidationMessages('password'), "password")}
                  <input type="password" className="form-control" placeholder="Re-type password" onChange={this.props.handleValidation('passwordConfirmation')} ref="passwordConfirmation"/>
                  {this.renderMessage(this.props.getValidationMessages('passwordConfirmation'), "password confirmation")}
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
