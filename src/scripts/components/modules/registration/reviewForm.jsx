var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../actions/registrationActions'),
    ShowCreditCard = require('./creditCard/showCreditCard'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    SinglePatient=require('./patient/singlePatient');

module.exports = React.createClass({
  getInitialState: function() {
    return({
      editYou: "edit",
      editFamily: "edit",
      editPayment: "edit"
    })
  },

  componentWillMount: function() {
    RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken);
  },

  handleEnroll: function() {
    switch(this.state.editYou){
      case "edit":
        this.setState({editYou: "save"});
        break;
      case "save":
        this.updateEnrollment();
        this.setState({editYou: "edit"});
        break;
    }
  },

  handlePayment: function(){
    switch(this.state.editPayment){
      case "edit":
        this.setState({editPayment: "save"});
        break;
      case "save":
        this.props.createCreditCard(this.refs.paymentForm);
        this.setState({editPayment: "edit"});
        break;
    }
  },

  updateEnrollment: function () {
    RegistrationActions.updateEnrollmentRequest({
      email: ReactDom.findDOMNode(this.refs.email).value.trim(),
      first_name: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      last_name: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      phone: ReactDom.findDOMNode(this.refs.phone).value.trim(),
      authentication_token: sessionStorage.enrollmentToken
    }, "review")
  },

  handleOnSubmit: function () {

  },

  parsePatientEnrollments: function(patientEnrollments){
    return patientEnrollments.map(function(patientEnrollment, i){
      return <SinglePatient key={i} patient={patientEnrollment}/>
    });
  },

  creditCardDisplay: function(){
    if(this.state.editPayment === "save"){
      return <CreateCreditCard ref="paymentForm"/>
    }else{
      return <ShowCreditCard creditCardBrand={this.props.creditCardBrand} last4={this.props.last4}/>
    }
  },

  formatPhoneNumber: function(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  },

  render: function() {
    if(this.props.enrollment){
      var email = this.props.enrollment.email;
      var firstName = this.props.enrollment.first_name;
      var lastName = this.props.enrollment.last_name;
      var phone = this.formatPhoneNumber(this.props.enrollment.phone);
      var patients = this.parsePatientEnrollments(this.props.enrollment.patient_enrollments);

      if(this.state.editYou === "save") {
        email = React.createElement('input', {defaultValue: email, type: "text", className: "form-control", ref: "email"});
        firstName = React.createElement('input', {defaultValue: firstName, type: "text", className: "form-control", ref: "firstName"});
        lastName = React.createElement('input', {defaultValue: lastName, type: "text", className: "form-control", ref: "lastName"});
        phone = React.createElement('input', {defaultValue: phone, type: "text", className: "form-control", ref: "phone"})
      }
    }

    var creditCard = this.creditCardDisplay();

    return (
      <div>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h3 className="signup-header">Let's double check!</h3>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>You</h4>
              </div>
              <div className="form-group col-md-1">
                <a onClick={this.handleEnroll}>{this.state.editYou}</a>
              </div>
              <div className="form-group col-md-4 col-md-offset-1">
                {email}
              </div>
              <div className="form-group col-md-2">
                {firstName}
              </div>
              <div className="form-group col-md-2">
                {lastName}
              </div>
              <div className="form-group col-md-3">
                {phone}
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>Family</h4>
              </div>
              <div className="form-group col-md-1">
                <a onClick={()=>this.handleClick('editYou')}>add</a>
              </div>
              <div className="form-group col-md-11 col-md-offset-1">
                {patients}
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>Payment</h4>
              </div>
              <div className="form-group col-md-1">
                <a onClick={this.handlePayment}>{this.state.editPayment}</a>
              </div>
            </div>
            <div className="form-group col-md-11 col-md-offset-1">
              {creditCard}
            </div>
          </div>
          <div className="col-md-1 col-md-offset-1">
            <div className="form-group">
              <button type="submit" className="btn btn-primary full-width-button">Go!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
