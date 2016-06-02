var React = require('react'),
    _ = require('lodash'),
    Helper = require('../../../../utils/registrationHelper'),
    validation = require('react-validation-mixin'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    Joi = require('joi'),
    classNames = require('classnames'),
    strategy = require('joi-validation-strategy');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: Helper.userValidatorTypes,

  getValidatorData: function(){
    return this.state
  },

  getInitialState: function(){
    return this.getInitialGuardian()
  },

  getInitialGuardian: function(){
    if(this.props.enrollment){
      return {
        firstName: this.props.enrollment.first_name,
        lastName: this.props.enrollment.last_name,
        phone: this.props.formatPhoneNumber(this.props.enrollment.phone),
      }
    }else{
      return { firstName: '', lastName: '', phone: ''}
    }
  },

  handleOnSubmit: function() {
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
      phone: this.state.phone.replace(/\D/g,''),
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      next_page: "patient"
    })
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

  render: function(){
    return(
      <div className="row">
        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.firstName}
                 onChange={this.handleFirstNameChange}
                 autoFocus
                 ref="firstName"/>
          <label className="text-muted">First Name</label>
          {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
        </div>

        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.lastName}
                 onChange={this.handleLastNameChange}
                 ref="lastName"/>
          <label className="text-muted">Last Name</label>
          {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
        </div>

        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.phone}
                 onChange={this.handlePhoneChange}
                 ref="phone"
                 onInput={Helper.phoneMask}/>
          <label className="text-muted">Phone</label>
          {Helper.renderHelpText(this.props.getValidationMessages('phone'))}
        </div>
      </div>
    )
  }
}));
