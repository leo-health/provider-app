var React = require('react'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    ErrorAlert = require('../modules/alert/errorAlert'),
    FAQ = require('../modules/registration/invited/invitedFaq'),
    RegistrationActions = require('../../actions/registrationActions'),
    RegistrationStore = require('../../stores/registrationStore'),
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
    return {
      header: '',
      secondHeader: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
      status: '',
      message: '',
      eligible: true
    }
  },

  componentWillMount: function(){
    RegistrationActions.fetchUserRequest({invitation_token: this.props.location.query.token});
  },

  onStatusChange: function(status){
    if(status.action === "convert") {
      if(this.isInvitedUser(status)){
        this.context.router.push("/registration/invited/success");
        return
      }

      if(this.isExemptedUser(status)){
        if(status.session){
          this.context.router.push({
            pathname: "/registration/success",
            query: {token: status.session.authentication_token}
          });
          return
        }else{
          this.setState({status: 'error', message: 'There was an error updating your information.'});
          return
        }
      }
    }

    if(status.action === "fetch"){
      this.checkEligibility(status);
      return
    }

    this.setState(status);
  },

  checkEligibility: function(data){
    if(this.isInvitedUser(data)){
      this.setState({
        header: 'Join your family’s account on Leo!',
        secondHeader: 'In order to get setup with your family on Leo, please fill out the information below.',
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        email: data.user.email
      })
    }else if(this.isExemptedUser(data)){
      this.setState({
        header: 'Become a Leo member!',
        secondHeader: 'Thank you for being a Flatiron Pediatrics family. Sign up below to access all the Leo features for free.',
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        email: data.user.email
      })
    }else{
      this.setState({ status: 'error', message: 'Please check your invitation link and come back again!' });
    }
  },

  isInvitedUser: function(data){
    return data.user.onboarding_group.group_name === "invited_secondary_guardian" &&
    this.props.location.query.onboarding_group === 'secondary'
  },

  isExemptedUser: function(data){
    return data.user.onboarding_group.group_name === "generated_from_athena" &&
    this.props.location.query.onboarding_group === 'primary'
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    if(!this.state.eligible) return;
    const onValidate = (error) => {
      if (error) {
        return;
      } else {
        RegistrationActions.convertInvitedOrExemptedRequest({
          invitation_token: this.props.location.query.token,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          phone: this.state.phone,
          password: this.state.password
        })
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
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

  handlePasswordConfirmationChange: function(e){
    this.setState({passwordConfirmation: e.target.value}, function(){
      if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('passwordConfirmation')();
    })
  },

  render: function(){
    return(
      <div id="signup_page">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <img src="/images/leo.png" alt="Leo Logo" id="signup_logo" style={{marginRight: "2%"}}/>
            <h4 id="signup_progress" className="signup-header">{this.state.header}</h4>
            <p className="lead">{this.state.secondHeader}</p>
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
                <label>First Name</label>
                {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
              </div>

              <div className="form-group col-md-6">
                <input type="text"
                       className="form-control"
                       value={this.state.lastName}
                       onChange={this.handleLastNameChange}
                       ref="lastName"/>
                <label>Last Name</label>
                {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
              </div>

              <div className="form-group col-md-12">
                <input type="text"
                       value={this.state.email}
                       className="form-control"
                       disabled="true"
                       onChange={this.handleEmailChange}/>
                <label>Email</label>
                {Helper.renderHelpText(this.props.getValidationMessages('email'))}
              </div>

              <div className="form-group col-md-12">
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

              <div className="form-group col-md-12">
                <input type="password"
                       value={this.state.password}
                       className="form-control"
                       onChange={this.handlePasswordChange}/>
                <label>Create Password</label>
                {Helper.renderHelpText(this.props.getValidationMessages('password'))}
              </div>

              <div className="form-group col-md-12">
                <input type="password"
                       value={this.state.passwordConfirmation}
                       className="form-control"
                       onChange={this.handlePasswordConfirmationChange}/>
                <label>Re-enter Password</label>
                {Helper.renderHelpText(this.props.getValidationMessages('passwordConfirmation'))}
              </div>
            </div>
          </div>

          <div className="col-md-4 form-group">
            <button onClick={this.handleOnSubmit}
                    className="btn btn-lg btn-primary full-width-button">
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
