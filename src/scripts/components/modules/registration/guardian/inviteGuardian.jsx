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
          <div className="col-md-7 col-md-offset-1">
            <h3 className="signup-header">Invite Another Guardian</h3>
          </div>
        </div>
        <div className="inline-hr"></div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 col-md-offset-1">
            <div className="row">
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
            </div>

            <div className="row">
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
            </div>
          </div>

          <div className="col-md-2">
            <button type="submit"
                    onClick={this.handleOnSubmit}
                    className="btn btn-primary full-width-button">
              Invite
            </button>
          </div>
        </div>
      </div>
    )
  }
}));
