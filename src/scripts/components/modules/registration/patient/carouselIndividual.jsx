var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.authenticationToken
    });
  },

  render: function(){
    var patient = this.props.patient;
    return(
      <div className="patient-individual">
        <div className="avatar-details">
          <img src="../../images/Avatar_Patient_Daughter.png" className="patient-avatar"/>
          <div className="avatar-name-container">
            <span className="avatar-first-name">{patient.first_name}</span>
          </div>
        </div>
        <div className="carousel-buttons">
          <a className="icon" onClick={this.handleDelete}>
            <span className="registration-icon glyphicon glyphicon-trash pull-right cursor">
            </span>
          </a>
          <a className="icon">
            <span className="registration-icon glyphicon glyphicon-pencil pull-right cursor">
            </span>
          </a>
        </div>
      </div>
    )
  }
});
