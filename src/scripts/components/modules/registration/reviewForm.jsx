var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../actions/registrationActions'),
    ShowCreditCard = require('./creditCard/showCreditCard'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    Patient = require('./patient');

module.exports = React.createClass({
  getInitialState: function() {
    return({
      editYou: "edit",
      editFamily: "edit",
      editPayment: "delete"
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
      case "delete":
        this.setState({editPayment: "save"});
        break;
      case "save":
        this.updateCreditCard();
        this.setState({editPayment: "delete"});
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
    })
  },

  handleOnSubmit: function () {

  },

  parsePatientEnrollments: function(patientEnrollments){
    return patientEnrollments.map(function(patientEnrollment, i){
      return <Patient key={i}
                      id={patientEnrollment.id}
                      firstName={patientEnrollment.first_name}
                      lastName={patientEnrollment.last_name}
                      sex={patientEnrollment.sex}
                      birthDate={patientEnrollment.birth_date.substring(0,10)}/>
    });
  },

  render: function() {
    if(this.props.enrollment){
      var email = this.props.enrollment.email;
      var firstName = this.props.enrollment.first_name;
      var lastName = this.props.enrollment.last_name;
      var phone = this.props.enrollment.phone;
      var patients = this.parsePatientEnrollments(this.props.enrollment.patient_enrollments);

      if(this.state.editYou === "save") {
        email = React.createElement('input', {defaultValue: email, type: "text", className: "form-control", ref: "email"});
        firstName = React.createElement('input', {defaultValue: firstName, type: "text", className: "form-control", ref: "firstName"});
        lastName = React.createElement('input', {defaultValue: lastName, type: "text", className: "form-control", ref: "lastName"});
        phone = React.createElement('input', {defaultValue: phone, type: "text", className: "form-control", ref: "phone"})
      }
    }

    var creditCard = <ShowCreditCard creditBrand={this.props.creditBrand} last4={this.props.last4}/>;
    if(this.state.editPayment === "save") creditCard = <CreateCreditCard/>;

    return (
      <div>
        <div className="body">
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <h3 className="signup-header">Let's double check!</h3>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <div className="row">
                <div className="form-group col-sm-9 col-sm-offset-1">
                  <h4>You</h4>
                </div>

                <div className="form-group col-sm-2">
                  <a onClick={this.handleEnroll}>{this.state.editYou}</a>
                </div>
              </div>

              <div className="row">
                <div className="form-group col-sm-6 col-sm-offset-1">
                  {email}
                </div>
                <div className="form-group col-sm-6 col-sm-offset-1">
                  {firstName} {lastName}
                </div>
                <div className="form-group col-sm-6 col-sm-offset-1">
                  {phone}
                </div>
              </div>

              <div className="row">
                <div className="form-group col-sm-9 col-sm-offset-1">
                  <h4>Family</h4>
                </div>

                <div className="form-group col-sm-2">
                  <a onClick={()=>this.handleClick('editYou')}>add</a>
                </div>
              </div>

              <div className="row">
                <div className="form-group col-sm-11 col-sm-offset-1">
                  {patients}
                </div>
              </div>

              <div className="row">
                <div className="form-group col-sm-9 col-sm-offset-1">
                  <h4>Payment</h4>
                </div>

                <div className="form-group col-sm-2">
                  <a onClick={this.handlePayment}>{this.state.editPayment}</a>
                </div>
              </div>

              <div className="form-group col-sm-11 col-sm-offset-1">
                {creditCard}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <button type="submit" id="signup_continue" className="btn btn-primary">Subscribe</button>&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
