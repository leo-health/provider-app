var React = require('react'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientEnrollmentRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.enrollmentToken
    })
  },

  formatDisplay: function(patient){
    var text;
    if(patient.sex === "M"){
      text = patient.first_name + ' ' +  patient.last_name + ' is a boy born at ' + patient.birth_date.substring(0, 10);
      return <span className="pull-left">
               <img src="../images/Avatar_Patient_Son.png" alt="son"/><span> </span>
               <p style={{display: "inline-block"}} className="lead">{text}</p>
             </span>
    }else{
      text = patient.first_name + ' ' +  patient.last_name + ' is a girl born at ' + patient.birth_date.substring(0, 10);
      return <span className="pull-left">
               <img src="../images/Avatar_Patient_Daughter.png" alt="daughter"/><span> </span>
               <p style={{display: "inline-block"}} className="lead">{text}</p>
             </span>
    }
  },

  render: function(){
    return(
      <div className="well row">
        <a className="icon" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash pull-right"></span></a>
        <a className="icon" onClick={this.props.handleEdit}><span className="glyphicon glyphicon-pencil pull-right"></span></a>
        {this.formatDisplay(this.props.patient)}
      </div>
    )
  }
});
