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
      <div className="row well">
        <div className="form-group col-md-10">
          <div className="row">
            <div className="col-md-3">
              {patient.first_name}
            </div>
            <div className="col-md-3">
              {patient.last_name}
            </div>
            <div className="col-md-2">
              {patient.sex}
            </div>
            <div className="col-md-4">
              {patient.birth_date.substring(0, 10)}
            </div>
          </div>
        </div>
        <div className="form-group col-md-2">
          <a className="icon" href="#" onClick={this.handleDelete}><span className="glyphicon glyphicon-trash pull-right"></span></a>
          <a className="icon" href="#" onClick={this.props.handleEdit}><span className="glyphicon glyphicon-pencil pull-right"></span></a>
        </div>
      </div>
    )
  }
});
