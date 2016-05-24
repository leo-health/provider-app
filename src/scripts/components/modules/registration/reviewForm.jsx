var React = require('react'),
    RegistrationActions = require('../../../actions/registrationActions'),
    ShowCreditCard = require('./creditCard/showCreditCard'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    ShowGuardian = require('./guardian/showGuardian'),
    EditGuardian = require('./guardian/editGuardian'),
    SinglePatient=require('./patient/singlePatient');

module.exports = React.createClass({
  getInitialState: function() {
    return({
      editGuardian: "edit",
      editFamily: "edit",
      editPayment: "edit"
    })
  },

  formatPhoneNumber: function(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  },

  componentWillMount: function() {
    RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken);
  },

  handleGuardian: function(){
    switch(this.state.editGuardian){
      case "edit":
        this.setState({editGuardian: "save"});
        break;
      case "save":
        this.refs.editGuardian.refs.component.handleOnSubmit();
        this.setState({editGuardian: "edit"});
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

  editOrShowGuardian: function(){
    if(this.state.editGuardian==="edit"){
      return <ShowGuardian enrollment={this.props.enrollment}
                           insurers={this.props.insurers}
                           formatPhoneNumber={this.formatPhoneNumber}/>
    }else{
      return <EditGuardian enrollment={this.props.enrollment}
                           insurers={this.props.insurers}
                           formatPhoneNumber={this.formatPhoneNumber}
                           ref="editGuardian"/>
    }
  },

  render: function() {
    if(this.props.enrollment){
      var email = this.props.enrollment.email;
      var patients = this.parsePatientEnrollments(this.props.enrollment.patient_enrollments);
    }

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
              <div className="form-group col-md-11 col-md-offset-1">
                <h4>You</h4>
              </div>
              <div className="form-group col-md-4 col-md-offset-1">
                {email}
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>Basic Info</h4>
              </div>
              <div className="form-group col-md-1">
                <a onClick={this.handleGuardian}>{this.state.editGuardian}</a>
              </div>
              <div className="form-group col-md-11 col-md-offset-1">
                {this.editOrShowGuardian()}
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
              {this.creditCardDisplay()}
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
