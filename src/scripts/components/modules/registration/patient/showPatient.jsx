var React = require('react'),
    moment = require('moment'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientEnrollmentRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.enrollmentToken
    })
  },

  formatDisplay: function(patient){
    var text;
    name_text = patient.first_name + ' ' +  patient.last_name;
    birthday_text = moment(patient.birth_date.substring(0, 10)).format('l');

    if(patient.sex === "M"){
      return <div className="pull-left">
               <img className="patient-avatar" src="../images/Avatar_Patient_Son.png" alt="son"/>
               <p style={{display: "inline-block"}} className="lead">{name_text} born on {birthday_text}</p>
             </div>
    }else{
      return <div className="pull-left">
               <img className="patient-avatar" src="../images/Avatar_Patient_Daughter.png" alt="daughter"/>
               <p style={{display: "inline-block"}} className="lead">{name_text} born on {birthday_text}</p>
             </div>
    }
  },

  render: function(){
    return(
      <div className="row well registration-well">
        <a className="icon" onClick={this.handleDelete}><span className="registration-icon glyphicon glyphicon-trash pull-right"></span></a>
        <a className="icon" onClick={this.props.handleEdit}><span className="registration-icon glyphicon glyphicon-pencil pull-right"></span></a>
        {this.formatDisplay(this.props.patient)}
      </div>
    )
  }
});
