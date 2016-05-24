var React = require('react'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientEnrollmentRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.enrollmentToken
    })
  },

  render: function(){
    var patient = this.props.patient;

    return(
      <div className="row">
        <div className="form-group col-md-11">
          <div className="row">
            <div className="col-md-2">
              <img src="../images/leo.png"/>
            </div>
            <div className="col-md-2">
              {patient.first_name}
            </div>
            <div className="col-md-2">
              {patient.last_name}
            </div>
            <div className="col-md-2">
              {patient.sex}
            </div>
            <div className="col-md-4">
              {patient.birth_date.substring(0, 10)}
            </div>
          </div>
        </div>

        <div className="form-group col-md-1">
          <a href="#" onClick={this.props.handleEdit}>E</a>
          <a href="#" onClick={this.handleDelete}>D</a>
        </div>
      </div>
    )
  }
});
