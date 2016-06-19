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
      return <ShowGuardian enrollment={this.props.enrollment}
                           guardianStateToggle={this.guardianStateToggle}
                           formatPhoneNumber={Helper.formatPhoneNumber}/>
    }else{
      return <EditGuardian enrollment={this.props.enrollment}
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
      return <div className="row">
         <a onClick={this.cancelPayment}><span className="registration-icon glyphicon glyphicon-remove pull-right"></span></a>
         <a onClick={this.handlePayment}><span className="registration-icon glyphicon glyphicon-ok pull-right"></span></a>
       </div>
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
    RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken);
    RegistrationActions.fetchPatientsRequest(sessionStorage.enrollmentToken)
  },

  componentDidMount: function(){
    if(leo.env === 'production') fbq('track', 'CompleteRegistration');
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.enrollment) this.setState({editGuardian: true});
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
    return this.props.patients.length > 0 ? {display: "block"} : {display: "none"}
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
        authentication_token: sessionStorage.enrollmentToken,
        credit_card_token: this.props.creditCardToken
      })
    }else{
      this.props.onPatientError()
    }
  },

  render: function() {
    return (
      <div>
        <div className="inline-hr"></div>
        <div className="row">
          <br/>
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-7 col-md-offset-1">
                  <div className="row">
          <div className="col-md-9 col-md-offset-1">
            <h3 className="signup-header">Let's double check!</h3>
            <p className="lead">Please review all of the information below.</p>
            <br/>
          </div>
        </div>
            {this.editOrShowGuardian()}
            <br/>
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>Your Family</h4>
              </div>
              <div className="form-group col-md-1">
                <a className="icon" onClick={this.addPatientToggle}
                   style={this.displayOrHideAddPatientButton()}>
                  <span className="registration-icon glyphicon glyphicon-plus pull-right"></span>
                  <br/>
                </a>
              </div>
              <div className="form-group col-md-11 col-md-offset-1">
                {this.addOrDisplayPatient()}
              </div>
              <br/>
              <div className="form-group col-md-11 col-md-offset-1">
                {this.state.showAddPatient}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>Payment</h4>
              </div>
              <div className="form-group col-md-1">
                {this.editOrSavePayment(this.state.editPayment)}
              </div>
              <div className="form-group col-md-11 col-md-offset-1">
                {this.creditCardDisplay()}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <button type="submit"
                      onClick={this.chargeUser}
                      className="btn btn-primary btn-lg full-width-button">
                Sign Up
              </button>
            </div>
            <p className='lead'>By clicking sign up you agree to our <a href='/terms' target='_blank'>terms of service</a> and <a href='/privacy' target='_blank'>privacy policies.</a></p>
          </div>
        </div>
      </div>
    )
  }
});
