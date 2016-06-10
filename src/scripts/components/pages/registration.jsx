var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    ErrorAlert = require('../modules/alert/errorAlert'),
    FAQ = require('../modules/registration/faq'),
    RegistrationActions = require('../../actions/registrationActions'),
    RegistrationStore = require('../../stores/registrationStore'),
    classNames = require('classnames'),
    Helper = require('../../utils/registrationHelper'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

var Registration  = React.createClass({
  mixins: [Reflux.listenTo(RegistrationStore, "onStatusChange")],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getValidatorData: function(){
    return this.state;
  },

  validatorTypes: _.merge($.extend({}, Helper.userValidatorTypes), Helper.passwordConfirmation),

  getInitialState: function() {
    return { firstName: "", lastName: "", email: "", phone: "", password: "", passwordConfirmation: "", state: "", message: "" }
  },

  componentWillMount: function(){
    RegistrationActions.fetchEnrollmentRequest(this.props.location.query.token);
  },

  onStatusChange: function(status){
    if(status.action === "update") {
      this.context.router.push("registration/completed");
      return
    }

    if(status.action === "fetch"){
      this.setState({
        firstName: status.enrollment.first_name,
        lastName: status.enrollment.last_name,
        email: status.enrollment.email
      });
      return
    }
    this.setState(status);
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return;
      } else {
        RegistrationActions.updateEnrollmentRequest({
          authentication_token: this.props.location.query.token,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password
        })
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
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

  handlePasswordChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('password')();
    this.setState({password: e.target.value})
  },

  handlePasswordConfirmationChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('passwordConfirmation')();
    this.setState({passwordConfirmation: e.target.value})
  },

  render: function(){
    return(
      <div id="signup_page">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <img src="/images/leo.png" alt="Leo Logo" id="signup_logo"/>
            <h4 id="signup_progress" className="signup-header">You are invited to join Leo!</h4>
            <p className="lead">We are thrilled to welcome you to the practice!
              We need to collect some information about you and your family in order to get you enrolled in the practice.
            </p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.state.message} status={this.state.status}/>
          </div>
          <div className="col-md-6 col-md-offset-1">
            <div className="row well">
              <div className="form-group col-md-6">
                <input type="text"
                       className="form-control"
                       value={this.state.firstName}
                       onChange={this.handleFirstNameChange}
                       autoFocus
                       ref="firstName"/>
                <label className="text-muted">First Name</label>
                {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
              </div>

              <div className="form-group col-md-6">
                <input type="text"
                       className="form-control"
                       value={this.state.lastName}
                       onChange={this.handleLastNameChange}
                       ref="lastName"/>
                <label className="text-muted">Last Name</label>
                {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
              </div>

              <div className="form-group col-md-12">
                <input type="text"
                       value={this.state.email}
                       className="form-control"
                       onChange={this.handleEmailChange}/>
                <label className="text-muted">Email</label>
                {Helper.renderHelpText(this.props.getValidationMessages('email'))}
              </div>

              <div className="form-group col-md-12">
                <input type="text"
                       className="form-control"
                       value={this.state.phone}
                       onChange={this.handlePhoneChange}
                       ref="phone"
                       onInput={Helper.phoneMask}/>
                <label className="text-muted">Phone</label>
                {Helper.renderHelpText(this.props.getValidationMessages('phone'))}
              </div>

              <div className="form-group col-md-12">
                <input type="password"
                       value={this.state.password}
                       className="form-control"
                       onChange={this.handlePasswordChange}/>
                <label className="text-muted">Password</label>
                {Helper.renderHelpText(this.props.getValidationMessages('password'))}
              </div>

              <div className="form-group col-md-12">
                <input type="password"
                       value={this.state.passwordConfirmation}
                       className="form-control"
                       onChange={this.handlePasswordConfirmationChange}/>
                <label className="text-muted">Password Confirmation</label>
                {Helper.renderHelpText(this.props.getValidationMessages('passwordConfirmation'))}
              </div>
            </div>
          </div>

          <div className="col-md-4 form-group">
            <button onClick={this.handleOnSubmit} className="btn btn-lg btn-primary full-width-button">
              Join
            </button><br/><br/>
            <FAQ/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = validation(strategy)(Registration);
