var React = require('react'),
    ReactRouter = require('react-router'),
    {Link} = ReactRouter
    RegistrationActions = require('../../../actions/registrationActions'),
    ShowCreditCard = require('./creditCard/showCreditCard'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    ShowGuardian = require('./guardian/showGuardian'),
    EditGuardian = require('./guardian/editGuardian'),
    EditPatient = require('./patient/editPatient'),
    SinglePatient=require('./patient/singlePatient');

module.exports = React.createClass({
  getInitialState: function() {
    return({
      editEmail: true,
      editGuardian: "edit",
      editFamily: "edit",
      editPayment: true,
      showAddPatient: undefined
    })
  },

  editOrSaveEmail: function(){
    if(this.state.editEmail){
      return <a onClick={this.handleEmail}>edit</a>
    }else{
      return <div className="row"><a onClick={this.handleEmail}>S</a><a onClick={this.cancelEmail}>C</a></div>
    }
  },


  editOrSave: function(isEdit){
    if(isEdit){
      return <a onClick={this.handlePayment}>edit</a>
    }else{
      return <div className="row"><a onClick={this.handlePayment}>S</a><a onClick={this.cancelPayment}>C</a></div>
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
      this.setState({editPayment: false});
    }
  },

  formatPhoneNumber: function(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  },

  componentWillMount: function() {
    RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken);
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.enrollment && nextProps.enrollment.patient_enrollments) this.setState({showAddPatient: undefined})
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

  parsePatientEnrollments: function(patientEnrollments){
    return patientEnrollments.map(function(patientEnrollment, i){
      return <SinglePatient key={i} patient={patientEnrollment}/>
    });
  },

  creditCardDisplay: function(){
    if(this.state.editPayment){
      return <ShowCreditCard creditCardBrand={this.props.creditCardBrand} last4={this.props.last4}/>
    }else{
      return <CreateCreditCard ref="paymentForm"/>
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

  addOrDisplayPatient: function () {
    if(this.props.enrollment.patient_enrollments.length > 0){
      return this.parsePatientEnrollments(this.props.enrollment.patient_enrollments)
    }else{
      return <EditPatient cacel={false}/>
    }
  },

  displayOrHideAddPatientButton: function(){
    if(this.props.enrollment && this.props.enrollment.patient_enrollments.length > 0){
      return {display: "inline-block"}
    }else{
      return {display: "none"}
    }
  },

  addPatientToggle: function(){
    if(this.state.showAddPatient){
      this.setState({showAddPatient: undefined})
    }else{
      this.setState({showAddPatient: <EditPatient handleCancel={this.addPatientToggle} cancel={true}/>})
    }
  },

  render: function() {
    if(this.props.enrollment){
      var email = this.props.enrollment.email;
      var patients = this.addOrDisplayPatient();
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
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>You</h4>
              </div>
              <div className="form-group col-md-1">
                {this.editOrSaveEmail()}
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
                <a onClick={this.addPatientToggle}
                   style={this.displayOrHideAddPatientButton()}>
                  add
                </a>
              </div>
              <div className="form-group col-md-11 col-md-offset-1">
                {patients}
              </div>
              <br/>
              <div className="form-group col-md-11 col-md-offset-1">
                {this.state.showAddPatient}
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="form-group col-md-10 col-md-offset-1">
                <h4>Payment</h4>
              </div>
              <div className="form-group col-md-1">
                {this.editOrSave(this.state.editPayment)}
              </div>
              <div className="form-group col-md-11 col-md-offset-1">
                {this.creditCardDisplay()}
              </div>
            </div>
          </div>
          <div className="col-md-1 col-md-offset-1">
            <div className="form-group">
              <Link to="/success"><button type="submit" className="btn btn-primary full-width-button">Go!</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
