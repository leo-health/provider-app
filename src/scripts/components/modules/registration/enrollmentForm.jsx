var React = require('react'),
    _ = require('lodash'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    classNames = require('classnames'),
    RegistrationActions = require('../../../actions/registrationActions'),
    RegistrationStore = require('../../../stores/registrationStore');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: {
    email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
    password: Joi.string().min(8).max(127).trim().required().label("Password")
  },

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
        RegistrationActions.createEnrollmentRequest(_.merge(this.state, {nextPage: 'you'}));
      }
    };
    this.submitHasBeenAttemptedOnce = true;
    this.props.validate(onValidate);
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
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <h3 className="signup-header">Let's get started</h3>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="form-group col-md-4 col-md-offset-1">
              <input type="text"
                     value={this.state.email}
                     className="form-control"
                     onChange={this.handleEmailChange}/>
              <label className="text-muted">Email</label>
              {this.renderHelpText(this.props.getValidationMessages('email'))}
            </div>

            <div className="form-group col-md-4">
              <input type="password"
                     value={this.state.password}
                     className="form-control"
                     onChange={this.handlePasswordChange}/>
              <label className="text-muted">Password</label>
              {this.renderHelpText(this.props.getValidationMessages('password'))}
            </div>


            <div className="col-md-2">
              <div className="form-group">
                <button type="submit" className="btn btn-primary full-width-button">Continue</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }})
);
