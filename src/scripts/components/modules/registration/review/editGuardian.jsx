var React = require('react'),
    _ = require('lodash'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: {
    email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone")
  },

  getValidatorData: function(){
    return this.state
  },

  getInitialState: function(){
    return this.getInitialGuardian()
  },

  getInitialGuardian: function(){
    if(this.props.enrollment) {
      return {
        email: this.props.enrollment.email,
        firstName: this.props.enrollment.first_name,
        lastName: this.props.enrollment.last_name,
        phone: this.props.formatPhoneNumber(this.props.enrollment.phone),
        insurancePlanId: this.props.enrollment.insurance_plan.id
      }
    }
    return { email: '', firstName: '', lastName: '', phone: '', insurancePlanId: ''}
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

  handleEmailChange: function(e) {
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('email')();
    this.setState({ email: e.target.value })
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

  handleSave: function(){
    this.handleOnSubmit();
    this.props.guardianStateToggle();
  },

  render: function(){
    return(
     <div>
      <div className="form-group col-md-10 col-md-offset-1">
        <h4>Basic Info</h4>
      </div>
      <div className="form-group col-md-1">
        <a onClick={this.handleOnSubmit}>S</a>
        <a onClick={this.props.guardianStateToggle}>C</a>
      </div>
      <div className="form-group col-md-11 col-md-offset-1">
        <div className="row">
          <div className="form-group col-md-3">
            <input type="text"
                   className="form-control"
                   value={this.state.email}
                   onChange={this.handleEmailChange}
                   ref="email"/>
            <label className="text-muted">Email</label>
            {this.renderHelpText(this.props.getValidationMessages('email'))}
          </div>
        </div>
        <br/>
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
      </div>
     </div>
    )
  }
}));