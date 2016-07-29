var React = require('react'),
    moment = require('moment'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    classNames = require('classnames'),
    EditPatient = require('./editPatient');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.authenticationToken
    });
    this.props.handleCancel();
  },

  handleEdit: function(){
    this.props.handleCancel();
    this.props.handleEdit(this.props.patient.id);
  },

  handleCancel: function(){
    this.props.handleCancel();
  },

  displayEdit: function(){
    if (this.props.editingPatient){
      return (
        <div className="edit-container">
          <EditPatient patient={this.props.patient}
                       handleCancel={this.handleCancel}
                       cancel={true}
                       nested={this.props.nested}/>
        </div>
        )
    } else {return}
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.patient != this.props.patient) {
      this.props.handleCancel();
    }
  },

  render: function(){
    var patientUnderlineClass = classNames({
      "patient-underline": true,
      "patient-underline--highlighted": this.props.editPatientID == this.props.patient.id
    });

    var patient = this.props.patient;
    if(patient.sex === "M"){
      avatarUrl = "../../images/Avatar_Patient_Son.png";
    }else{
      avatarUrl = "../../images/Avatar_Patient_Daughter.png";
    }
    return(
      <div>
        <div className="patient-individual">
          <div className="avatar-details">
            <img src={avatarUrl} className="patient-avatar"/>
            <div className="avatar-name-container">
              <span className="avatar-first-name">{patient.first_name}</span>
              <div className={patientUnderlineClass}></div>
            </div>
          </div>
          <div className="carousel-buttons">
            <a className="icon" onClick={this.handleDelete}>
              <span className="registration-icon glyphicon glyphicon-trash pull-right cursor">
              </span>
            </a>
            <a className="icon" onClick={this.handleEdit}>
              <span className="registration-icon glyphicon glyphicon-pencil pull-right cursor">
              </span>
            </a>
          </div>
        </div>
        {this.displayEdit()}
      </div>
    )
  }
});
