var React = require('react'),
    ReactDom = require('react-dom'),
    _ = require('lodash'),
    RegistrationActions = require('../../../actions/registrationActions'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone")
  },

  getInitialState: function(){
    return {
      insurancePlanId: this.props.insurers[0].insurance_plans[0].id || undefined
    }
  },

  getValidatorData: function(){
    return {
      firstName: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      lastName: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      phone: ReactDom.findDOMNode(this.refs.phone).value.trim()
    }
  },

  setInsurancePlanId: function(e){
    this.setState({
      insurancePlanId: Number(e.target.value)
    })
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
      phone: ReactDom.findDOMNode(this.refs.phone).value.trim(),
      insurance_plan_id: this.state.insurancePlanId
    }, "patient")
  },

  parseInsurers: function(){
    var plans = [];
    if( this.props.insurers.length > 0 ){
      _.each(this.props.insurers, function(insurer){
         _.each(insurer.insurance_plans, function(insurancePlan){
          plans.push(React.createElement('option',
              {key: insurancePlan.id, value: insurancePlan.id},
              insurer.insurer_name + ' ' +insurancePlan.plan_name))
        })
      });
    }
    return plans
  },

  onChange: function(ref){
    return event => {
      if (this.submitHasBeenAttemptedOnce) this.props.handleValidation(ref)();
    }
  },

  renderHelpText: function(message){
    var messageClass = classNames({
      "text-danger": message.length > 0,
      "text-muted": message.length === 0
    });

    return <label className={messageClass}>{message}</label>
  },

  render: function(){
    return(
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="body">
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Tell us about yourself!</h3>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="col-sm-12">
                    <select className="form-control"
                            id="select"
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
                    <input type="text" className="form-control" onChange={this.onChange('phone')} placeholder="Phone" ref="phone"/>
                    {this.renderHelpText(this.props.getValidationMessages('phone'))}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <button type="submit" id="signup_continue" className="btn btn-primary">Continue</button>&nbsp;
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}));
