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
        email: this.props.enrollment.email,
        firstName: this.props.enrollment.first_name,
        lastName: this.props.enrollment.last_name,
        phone: this.props.formatPhoneNumber(this.props.enrollment.phone)
      }
    }else{
      return { firstName: '', lastName: '', phone: '', email: '', password: ''}
    }
  },

  handleOnSubmit: function() {
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.createEnrollment();
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  createEnrollment: function(){
    RegistrationActions.createEnrollmentRequest({
      authentication_token: sessionStorage.enrollmentToken,
      phone: this.state.phone.replace(/\D/g,''),
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      client_version: "1.0.1",
      next_page: "patient"
    });
    this.props.setDisableState();
  },

  handlePhoneChange: function(e) {
    this.setState({ phone: e.target.value }, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('phone')();
    });
  },

  handleFirstNameChange: function(e) {
    this.setState({ firstName: e.target.value }, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('firstName')();
    });
  },

  handleLastNameChange: function (e) {
    this.setState({ lastName: e.target.value }, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('lastName')();
    });
  },

  handlePhoneChange: function(e) {
    this.setState({ phone: e.target.value }, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('phone')();
    });
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value}, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('email')();
    });
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value}, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('password')();
    });
  },

  render: function(){
    return(
      <div className="row well">
        <div className="form-group col-lg-6">
          <input type="text"
                 className="form-control"
                 value={this.state.firstName}
                 onChange={this.handleFirstNameChange}
                 autoFocus
                 ref="firstName"/>
          <label className="text-muted">First Name</label>
          {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
        </div>

        <div className="form-group col-lg-6">
          <input type="text"
                 className="form-control"
                 value={this.state.lastName}
                 onChange={this.handleLastNameChange}
                 ref="lastName"/>
          <label className="text-muted">Last Name</label>
          {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
        </div>

        <div className="form-group col-lg-12">
          <input type="text"
                 value={this.state.email}
                 className="form-control"
                 onChange={this.handleEmailChange}/>
          <label className="text-muted">Email</label>
          {Helper.renderHelpText(this.props.getValidationMessages('email'))}
        </div>

        <div className="form-group col-lg-12">
          <input type="password"
                 value={this.state.password}
                 className="form-control"
                 onChange={this.handlePasswordChange}/>
          <label className="text-muted">Create Password</label>
          {Helper.renderHelpText(this.props.getValidationMessages('password'))}
        </div>

        <div className="form-group col-lg-12">
          <input type="text"
                 className="form-control"
                 value={this.state.phone}
                 onChange={this.handlePhoneChange}
                 ref="phone"
                 pattern="[0-9]*"
                 onInput={Helper.phoneMask}/>
          <label className="text-muted">Phone</label>
          {Helper.renderHelpText(this.props.getValidationMessages('phone'))}
        </div>
      </div>
    )
  }
}));
