var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(patientId){
    RegistrationActions.removePatientRequest({
      id: patientId, authentication_token: sessionStorage.authenticationToken
    })
  },

  formatDisplay: function(patients){
    if(patients.length <= 3){

    }
  },

  render: function(){
    return(
      <div className="patient-carousel mobile-only">
        <div className="patient-individual">
          <img src="../../images/Avatar_Patient_Daughter.png" className="patient-avatar"/>
          <span className="avatar-first-name">FirstName</span>
          <div className="carousel-buttons">
            <a className="icon" onClick={this.handleDelete}>
              <span className="registration-icon glyphicon glyphicon-trash pull-right cursor">
              </span>
            </a>
            <a className="icon" onClick={this.props.handleEdit}>
              <span className="registration-icon glyphicon glyphicon-pencil pull-right cursor">
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  }
});
