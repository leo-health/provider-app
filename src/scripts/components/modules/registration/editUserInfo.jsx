var React = require('react'),
    ReactDom = require('react-dom'),
    _ = require('lodash'),
    RegistrationActions = require('../../../actions/registrationActions'),
    RegistrationStore = require('../../../stores/registrationStore'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone")
  },

  getValidatorData: function(){
    return {
      firstName: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      lastName: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      phone: ReactDom.findDOMNode(this.refs.phone).value.trim()
    }
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.updateEnrollment();
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  updateEnrollment: function(){
    RegistrationActions.updateEnrollmentRequest({
      authentication_token: sessionStorage.enrollmentToken,
      first_name: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      last_name: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      phone: ReactDom.findDOMNode(this.refs.phone).value.replace(/\D/g,''),
      insurance_plan_id: this.state.insurancePlanId
    }, "patient")
  },

  render: function(){
    return(
      <form onSubmit={this.handleOnSubmit}>
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <h3 className="signup-header">Tell us about yourself!</h3>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <div className="row form-group">
                <div className="col-sm-12">
                  <select className="form-control"
                          size="3"
                          onChange={this.setInsurancePlanId}
                      >
                    {this.parseInsurers()}
                  </select>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="form-group col-sm-6">
                  <input type="text" className="form-control" onChange={this.onChange('firstName')} placeholder="First Name" ref="firstName"/>
                  {this.renderHelpText(this.props.getValidationMessages('firstName'))}
                </div>

                <div className="form-group col-sm-6">
                  <input type="text" className="form-control" onChange={this.onChange('lastName')} placeholder="Last Name" ref="lastName"/>
                  {this.renderHelpText(this.props.getValidationMessages('lastName'))}
                </div>
              </div>

              <div className="row">
                <div className="form-group col-sm-12">
                  <input type="text"
                         className="form-control"
                         onChange={this.onChange('phone')}
                         placeholder="Phone"
                         ref="phone"
                         onInput={this.phoneMask}/>
                  {this.renderHelpText(this.props.getValidationMessages('phone'))}
                </div>
              </div>
            </div>
        </div>
      </form>
    )
  }
}));
