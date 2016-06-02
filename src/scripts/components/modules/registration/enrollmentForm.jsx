var React = require('react'),
    _ = require('lodash'),
    Helper = require('../../../utils/registrationHelper'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    classNames = require('classnames'),
    RegistrationActions = require('../../../actions/registrationActions'),
    ErrorAlert = require('../alert/errorAlert'),
    RegistrationStore = require('../../../stores/registrationStore');

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

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        debugger
        RegistrationActions.createEnrollmentRequest(_.merge(this.state, {nextPage: 'you'}));
      }
    };
    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
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
      <form onSubmit={this.handleOnSubmit}>
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
            {this.renderHelpText(this.props.getValidationMessages('email'))}
          </div>

          <div className="col-md-4">
            <input type="password"
                   value={this.state.password}
                   className="form-control"
                   onChange={this.handlePasswordChange}/>
            <label className="text-muted">Password</label>
            {this.renderHelpText(this.props.getValidationMessages('password'))}
          </div>


          <div className="col-md-2 form-group">
            <button type="submit" className="btn btn-primary full-width-button">Continue</button>
          </div>
        </div>
      </form>
    )
  }})
);
