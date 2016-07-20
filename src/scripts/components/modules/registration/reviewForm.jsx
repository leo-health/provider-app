var React = require('react'),
    ReactRouter = require('react-router'),
    {Link} = ReactRouter,
    Helper = require('../../../utils/registrationHelper'),
    ErrorAlert = require('../alert/errorAlert'),
    RegistrationActions = require('../../../actions/registrationActions'),
    ShowCreditCard = require('./creditCard/showCreditCard'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    ShowGuardian = require('./review/showGuardian'),
    EditGuardian = require('./review/editGuardian'),
    EditPatient = require('./patient/editPatient'),
    SinglePatient=require('./patient/singlePatient');

module.exports = React.createClass({
  getInitialState: function() {
    return({ editGuardian: true, editPayment: true, showAddPatient: false, status: '', message: '' })
  },

  editOrShowGuardian: function(){
    if(this.state.editGuardian){
      return <ShowGuardian user={this.props.user}
                           guardianStateToggle={this.guardianStateToggle}
                           formatPhoneNumber={Helper.formatPhoneNumber}/>
    }else{
      return <EditGuardian user={this.props.user}
                           guardianStateToggle={this.guardianStateToggle}
                           formatPhoneNumber={Helper.formatPhoneNumber}/>
    }
  },

  guardianStateToggle: function(){
    this.setState({editGuardian: !this.state.editGuardian})
  },

  editOrSavePayment: function(isEdit){
    if(isEdit){
      return <a className="icon" onClick={this.handlePayment}><span className="registration-icon glyphicon glyphicon-pencil pull-right"></span></a>
    }else{
      return(
        <div className="pull-right inline-block">
          <a onClick={this.handlePayment}><span className="registration-icon glyphicon glyphicon-ok"></span></a>
          <a onClick={this.cancelPayment}><span className="registration-icon glyphicon glyphicon-remove"></span></a>
        </div>
      )
    }
  },

  cancelPayment: function(){
    this.setState({editPayment: true})
  },

  handlePayment: function(){
    if(this.state.editPayment) {
      this.setState({editPayment: false})
    }else{
      this.refs.paymentForm.createCreditCard();
      this.setState({editPayment: true});
    }
  },

  componentWillMount: function() {
    RegistrationActions.fetchUserRequest(sessionStorage.authenticationToken);
    RegistrationActions.fetchPatientsRequest(sessionStorage.authenticationToken)
  },

  componentDidMount: function(){
    if(PRODUCTION) fbq('track', 'CompleteRegistration');
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.user) this.setState({editGuardian: true});
    if (nextProps.patients) this.setState({showAddPatient: false})
  },

  creditCardDisplay: function(){
    if(this.state.editPayment){
      return <ShowCreditCard creditCardBrand={this.props.creditCardBrand} last4={this.props.last4}/>
    }else{
      return <CreateCreditCard ref="paymentForm"/>
    }
  },

  addOrDisplayPatient: function () {
    return this.props.patients.length > 0 ? this.parsePatients(this.props.patients) : <EditPatient cancel={false}/>
  },

  parsePatients: function(patients){
    return patients.map(function(patient, i){
      return <SinglePatient key={i} patient={patient}/>
    });
  },

  displayOrHideAddPatientButton: function(){
    if(this.props.patients.length === 0){
      return {display: "none"}
    }
  },

  addPatientToggle: function(){
    if(this.state.showAddPatient){
      this.setState({showAddPatient: false})
    }else{
      this.setState({showAddPatient: <EditPatient handleCancel={this.addPatientToggle} cancel={true}/>})
    }
  },

  chargeUser: function(){
    if(this.props.patients.length > 0){
      RegistrationActions.createSubscriptionRequest({
        authentication_token: sessionStorage.authenticationToken,
        credit_card_token: this.props.creditCardToken
      })
    }else{
      this.props.onPatientError()
    }
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7 col-lg-offset-1">
            <h3 className="signup-header">Let's double check!</h3>
            <p className="lead">Please review all of the information below and click 'Sign Up' to complete enrollment.</p>
            <div className="col-lg-12">
              {this.editOrShowGuardian()}
            </div>
            <div className="col-lg-12">
              <h4 style={{display: 'inline-block'}}>Your Family</h4>
              <a className="icon"
                 onClick={this.addPatientToggle}
                 style={this.displayOrHideAddPatientButton()}>
                <span className="registration-icon glyphicon glyphicon-plus pull-right"></span>
              </a>
            </div>
            <div className="col-lg-12">
              {this.addOrDisplayPatient()}
            </div>
            <div className="col-lg-12">
              {this.state.showAddPatient}
            </div>
            <div className="col-lg-12">
              <h4 className="inline-block">Payment</h4>
              {this.editOrSavePayment(this.state.editPayment)}
            </div>
            <div className="col-lg-12">
              {this.creditCardDisplay()}
            </div>
          </div>
          <div className="col-lg-3">
            <button type="submit"
                    onClick={this.chargeUser}
                    className="btn btn-primary btn-lg full-width-button button-margin-top">
              Sign Up
            </button>
            <br/><br/>
            <p className='lead'>By clicking sign up you agree to our <a href='/terms' target='_blank'>terms of service</a> and <a href='/privacy' target='_blank'>privacy policies.</a></p>
          </div>
        </div>
      </div>
    )
  }
});
