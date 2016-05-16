var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../actions/registrationActions'),
    Patient = require('./patient');

module.exports = React.createClass({
  componentWillMount: function(){
    RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken)
  },

  handleClick: function(){

  },

  handleOnSubmit: function () {},

  parsePatientEnrollments: function(patientEnrollments){
    return patientEnrollments.map(function(patientEnrollment, i){
      return <Patient key={i}
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
    }

    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
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
                    <a onClick={()=>this.props.handleClick('you')}>edit</a>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-11 col-sm-offset-1">
                    {email}
                  </div>
                  <div className="form-group col-sm-11 col-sm-offset-1">
                    {firstName} {lastName}
                  </div>
                  <div className="form-group col-sm-11 col-sm-offset-1">
                    {phone}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-9 col-sm-offset-1">
                    <h4>Family</h4>
                  </div>

                  <div className="form-group col-sm-2">
                    <a>edit</a>
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
                    <a onClick={()=>this.props.handleClick('payment')}>edit</a>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-11 col-sm-offset-1">
                    American Express *****4242
                    {sessionStorage["creditBrand"]} ****{sessionStorage["last4"]}
                  </div>
                  <div className="form-group col-sm-11 col-sm-offset-1">
                    Your card will be charged on a monthly base
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <button type="submit" id="signup_continue" className="btn btn-primary">Subscribe</button>&nbsp;
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
});
