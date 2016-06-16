var React = require('react'),
    _ = require('lodash'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    Helper = require('../../../../utils/registrationHelper'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: _.omit(Helper.userValidatorTypes, ['password']),

  getValidatorData: function(){
    return this.state
  },

  getInitialState: function(){
    if(this.props.enrollment) {
      return {
        email: this.props.enrollment.email,
        firstName: this.props.enrollment.first_name,
        lastName: this.props.enrollment.last_name,
        phone: this.props.formatPhoneNumber(this.props.enrollment.phone)
      }
    }
    return { email: '', firstName: '', lastName: '', phone: ''}
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
      phone: this.state.phone.replace(/\D/g,''),
      first_name: this.state.firstName,
      last_name: this.state.lastName
    })
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

  render: function(){
    return(
     <div>
      <div className="form-group col-md-9 col-md-offset-1">
        <h4>Basic Info</h4>
      </div>
      <div className="form-group col-md-2">
        <a onClick={this.props.guardianStateToggle}><span className="registration-icon glyphicon glyphicon-remove pull-right"></span></a>
        <a onClick={this.handleOnSubmit}><span className="registration-icon glyphicon glyphicon-ok pull-right"></span></a>
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
            {Helper.renderHelpText(this.props.getValidationMessages('email'))}
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="form-group col-md-4">
            <input type="text"
                   className="form-control"
                   value={this.state.firstName}
                   onChange={this.handleFirstNameChange}
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
                   pattern="[0-9]*"
                   onInput={Helper.phoneMask}/>
            <label className="text-muted">Phone</label>
            {Helper.renderHelpText(this.props.getValidationMessages('phone'))}
          </div>
        </div>
      </div>
     </div>
    )
  }
}));
