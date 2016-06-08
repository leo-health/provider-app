var React = require('react'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientEnrollmentRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.enrollmentToken
    })
  },

  formatDisplay: function(patient){
    var sex = patient.sex === "M" ? 'boy' : 'girl';
    return patient.first_name + ' ' +  patient.last_name + ' is a ' + sex + ' born at ' + patient.birth_date.substring(0, 10)
  },

  render: function(){
    return(
      <div className="row well">
        <a className="icon" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash pull-right"></span></a>
        <a className="icon" onClick={this.props.handleEdit}><span className="glyphicon glyphicon-pencil pull-right"></span></a>
        <span className="pull-left">
          <img src="../images/leo.png" alt="..." />
          <p style={{display: "inline-block"}} className="lead">{this.formatDisplay(this.props.patient)}</p>
        </span>
      </div>
    )
  }
});
