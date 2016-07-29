var React = require('react'),
    moment = require('moment'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    classNames = require('classnames'),
    EditPatient = require('./editPatient');

module.exports = React.createClass({
  getInitialState: function(){
    return {isEdit: false}
  },

  handleDelete: function(){
    RegistrationActions.removePatientRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.authenticationToken
    });
    if(this.state.isEdit){
      this.props.editingCancel();
    }
  },

  handleEdit: function(){
    this.setState({isEdit: true})
    this.props.handleCancel();
    if(!this.state.isEdit || this.props.editingCount == 0){
      this.props.editingAdd();
    }
  },

  handleCancel: function(){
    this.setState({isEdit: false})
    this.props.editingCancel();
  },

  displayEdit: function(){
    if (this.state.isEdit && this.props.editingCount > 0){
      return (
        <div className="edit-container">
          <EditPatient patient={this.props.patient}
                       handleCancel={this.handleCancel}
                       cancel={true}
                       nested={true}/>
        </div>
        )
    } else {return}
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.patient != this.props.patient) {
      this.setState({isEdit: false})
      this.props.editingCancel();
    }
  },

  render: function(){
    var patientClass = classNames({
      "patient-individual": true,
      "patient-individual--highlighted": this.state.isEdit
    });

    var patient = this.props.patient;
    if(patient.sex === "M"){
      avatarUrl = "../../images/Avatar_Patient_Son.png";
    }else{
      avatarUrl = "../../images/Avatar_Patient_Daughter.png";
    }
    return(
      <div>
        <div className={patientClass}>
          <div className="avatar-details">
            <img src={avatarUrl} className="patient-avatar"/>
            <div className="avatar-name-container">
              <span className="avatar-first-name">{patient.first_name}</span>
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
