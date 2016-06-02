var React = require('react'),
    _ = require('lodash'),
    Helper = require('../../../utils/registrationHelper'),
    RegistrationActions = require('../../../actions/registrationActions'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    classNames = require('classnames'),
    ErrorAlert = require('../alert/errorAlert');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: Helper.enrollmentValidatorTypes,

  getValidatorData: function(){
    return this.state
  },

  getInitialState: function(){
    return { email: '', password: '' }
  },

  handleEmailChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('email')();
    this.setState({email: e.target.value})
  },

  handlePasswordChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('password')();
    this.setState({password: e.target.value})
  },

  handleOnSubmit: function() {
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        RegistrationActions.createEnrollmentRequest(_.merge(this.state, {nextPage: 'you'}));
      }
    };
    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  render: function(){
    return(
      <div>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h3 className="signup-header">Let's get started</h3>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            <input type="text"
                   value={this.state.email}
                   className="form-control"
                   onChange={this.handleEmailChange}/>
            <label className="text-muted">Email</label>
            {Helper.renderHelpText(this.props.getValidationMessages('email'))}
          </div>

          <div className="col-md-4">
            <input type="password"
                   value={this.state.password}
                   className="form-control"
                   onChange={this.handlePasswordChange}/>
            <label className="text-muted">Password</label>
            {Helper.renderHelpText(this.props.getValidationMessages('password'))}
          </div>


          <div className="col-md-2 form-group">
            <button onClick={this.handleOnSubmit} className="btn btn-primary full-width-button">Continue</button>
          </div>
        </div>
      </div>
    )
  }})
);
