var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');
var EditPatient = require('./editPatient');

module.exports = React.createClass({
  getInitialState: function(){
    return {isEdit: false}
  },

  handleDelete: function(){
    RegistrationActions.removePatientRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.authenticationToken
    });
  },

  handleEdit: function(){
    this.setState({isEdit: true})
    if(!this.state.isEdit){
      this.props.editingAdd();
    }
  },

  handleCancel: function(){
    this.setState({isEdit: false})
    this.props.editingCancel();
  },

  displayEdit: function(){
    if (this.state.isEdit){
      return (
        <div className="edit-container">
          <EditPatient patient={this.props.patient} handleCancel={this.handleCancel} cancel={true} nested={true}/>
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
    var patient = this.props.patient;
    return(
      <div>
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
