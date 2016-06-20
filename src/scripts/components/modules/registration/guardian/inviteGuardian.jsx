var React = require('react'),
    _ = require('lodash'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    Helper = require('../../../../utils/registrationHelper'),
    ErrorAlert = require('../../alert/errorAlert'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: _.omit(Helper.userValidatorTypes, ['phone', 'password']),

  getValidatorData: function(){
    return this.state
  },

  getInitialState: function(){
    return { email: '', firstName: '', lastName: ''}
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.inviteGuardian();
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  inviteGuardian: function(){
    RegistrationActions.inviteSecondParentRequest({
      authentication_token: this.props.token,
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName
    })
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

  render: function(){
    return(
      <div>
        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
        <div className="row">

          <div className="col-md-6 col-md-offset-3">
            <div className="row well">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="signup-header">Invite another parent or caregiver to your account</h4>
                </div>
              </div>
              <div className="form-group col-sm-6">
                <input type="text"
                       className="form-control"
                       value={this.state.firstName}
                       onChange={this.handleFirstNameChange}
                       ref="firstName"/>
                <label className="text-muted">First Name</label>
                <div className="form-group">
                  {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
                </div>
              </div>

              <div className="form-group col-sm-6">
                <input type="text"
                       className="form-control"
                       value={this.state.lastName}
                       onChange={this.handleLastNameChange}
                       ref="lastName"/>
                <label className="text-muted">Last Name</label>
                <div className="form-group">
                  {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
                </div>
              </div>

                <div className="form-group col-sm-12">
                  <input type="text"
                         className="form-control"
                         value={this.state.email}
                         onChange={this.handleEmailChange}
                         ref="email"/>
                  <label className="text-muted">Email</label>
                </div>
                <div className="form-group col-sm-12">
                  {Helper.renderHelpText(this.props.getValidationMessages('email'))}
                </div>


              <button type="submit"
                    onClick={this.handleOnSubmit}
                    className="btn btn-primary btn-lg full-width-button">Invite</button>
              <p className="lead"></p>
              <p className="text-muted lead">By adding a parent or caregiver you are providing this individual with access to your family's account and health data.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}));
