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
      <div className="row well col-md-10">
        <a className="icon" href="#" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash pull-right"></span></a>

        <a className="icon" href="#" onClick={this.props.handleEdit}><span className="glyphicon glyphicon-pencil pull-right"></span></a>
        <span className="pull-left">
          <img src="../images/leo.png" alt="..." />
            <p className="lead">{patient.first_name} {patient.last_name}
            {patient.birth_date.substring(0, 10)}</p>
        </span>

      </div>
    )
  }
});
