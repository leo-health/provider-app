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
    if (this.props.editingPatient && this.props.editPatientID == this.props.patient.id){
      return (
        <div className="edit-container">
          <EditPatient patient={this.props.patient}
                       handleCancel={this.handleCancel}
                       cancel={true}
                       review={this.props.review}
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
    console.log("This is the patient that's being edited:");
    console.log(this.props.patient.first_name);
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
              <i className="fa fa-trash-o fa-2x cursor icon" onClick={this.handleDelete}></i>
              <i className="fa fa-edit fa-2x cursor icon" onClick={this.handleEdit}></i>
          </div>
        </div>
        {this.displayEdit()}
      </div>
    )
  }
});
