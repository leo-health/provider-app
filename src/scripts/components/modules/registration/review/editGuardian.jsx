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
    if(this.props.user) {
      return {
        email: this.props.user.email,
        firstName: this.props.user.first_name,
        lastName: this.props.user.last_name,
        phone: this.props.formatPhoneNumber(this.props.user.phone)
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
    RegistrationActions.updateUserRequest({
      authentication_token: sessionStorage.authenticationToken,
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
     <div className="row">
       <div className="col-lg-12">
         <h4 className="inline-block">Your Information</h4>
         <a onClick={this.props.guardianStateToggle}>
           <span className="registration-icon glyphicon glyphicon-remove pull-right"></span>
         </a>
       </div>

       <div className="col-lg-12 well">
         <div className="col-lg-6">
           <input type="text"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                  ref="firstName"/>
           <label>First Name</label>
           {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
         </div>

         <div className="col-lg-6">
           <input type="text"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                  ref="lastName"/>
           <label>Last Name</label>
           {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
         </div>

         <div className="col-lg-6">
           <input type="text"
                  className="form-control"
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                  ref="phone"
                  pattern="[0-9]*"
                  onInput={Helper.phoneMask}/>
           <label>Phone</label>
           {Helper.renderHelpText(this.props.getValidationMessages('phone'))}
         </div>

        <div className="col-lg-12">
          <button onClick={this.handleOnSubmit}
                  className="btn btn-primary full-width-button">
            Done
          </button>
        </div>
      </div>
    </div>
   )
  }
}));
