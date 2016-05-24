var React = require('react'),
    _ = require('lodash'),
    RegistrationActions = require('../../../../actions/registrationActions'),
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
    if(this.props.enrollment){
      return {
        firstName: this.props.enrollment.first_name,
        lastName: this.props.enrollment.last_name,
        phone: this.props.formatPhoneNumber(this.props.enrollment.phone),
        insurancePlanId: this.props.enrollment.insurance_plan.id
      }
    }else{
      return { firstName: '', lastName: '', phone: '', insurancePlanId: ''}
    }
  },

  getValidatorData: function(){
    return this.state
  },

  componentWillReceiveProps: function(nextProp){
    if( nextProp.insurers.length > 0 ){
      this.setState({
        insurancePlanId: nextProp.insurers[0].insurance_plans[0].id
      })
    }
  },

  handleOnSubmit: function(){
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
    RegistrationActions.updateEnrollmentRequest(
      {
        authentication_token: sessionStorage.enrollmentToken,
        phone: this.state.phone.replace(/\D/g,''),
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        insurance_plan_id: this.state.insurancePlanId
      }, "patient"
    )
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

  renderHelpText: function(message){
    var messageClass = classNames({
      "text-danger": message.length > 0,
      "text-muted": message.length === 0
    });

    return <label className={messageClass}>{message}</label>
  },

  phoneMask: function(e){
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  },

  handleFirstNameChange: function(e) {
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('firstName')();
    this.setState({ firstName: e.target.value })
  },

  handleLastNameChange: function (e) {
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('lastName')();
    this.setState({ lastName: e.target.value })
  },

  handlePhoneChange: function(e) {
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('phone')();
    this.setState({ phone: e.target.value })
  },

  handleInsuranceChange: function(e){
    this.setState({ insurancePlanId: e.target.value })
  },

  render: function(){
    return(
      <div className="row">
        <div className="col-md-3">
          <select className="form-control"
                  value={this.state.insurancePlanId}
                  onChange={this.handleInsuranceChange}>
            {this.parseInsurers()}
          </select>
          <label className="text-muted">Insurance</label>
        </div>


        <div className="form-group col-md-3">
          <input type="text"
                 className="form-control"
                 value={this.state.firstName}
                 onChange={this.handleFirstNameChange}
                 ref="firstName"/>
          <label className="text-muted">First Name</label>
          {this.renderHelpText(this.props.getValidationMessages('firstName'))}
        </div>

        <div className="form-group col-md-3">
          <input type="text"
                 className="form-control"
                 value={this.state.lastName}
                 onChange={this.handleLastNameChange}
                 ref="lastName"/>
          <label className="text-muted">Last Name</label>
          {this.renderHelpText(this.props.getValidationMessages('lastName'))}
        </div>

        <div className="form-group col-md-3">
          <input type="text"
                 className="form-control"
                 value={this.state.phone}
                 onChange={this.handlePhoneChange}
                 ref="phone"
                 onInput={this.phoneMask}/>
          <label className="text-muted">Phone</label>
          {this.renderHelpText(this.props.getValidationMessages('phone'))}
        </div>
      </div>
    )
  }
}));
