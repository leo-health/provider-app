var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return { display: "s" }
  },

  deletePatient: function(){
    RegistrationActions.removePatientEnrollmentRequest({
      id: this.props.id,
      authentication_token: sessionStorage.enrollmentToken
    })
  },

  updatePatient: function(){
    if(this.state.editFamily === "edit"){
      this.setState({
        display: "s"
      })
    }else{
      RegistrationActions.updatePatientEnrollmentRequest({
        id: this.props.id,
        first_name: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
        last_name: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
        sex: ReactDom.findDOMNode(this.refs.sex).value.trim(),
        birth_date: ReactDom.findDOMNode(this.refs.birthDate).value.trim(),
        authentication_token: sessionStorage.enrollmentToken
      });
      this.setState({
        display: "e"
      })
    }
  },

  render: function(){
    var patient = this.props.patient;

    return(
      <div>
        <div className="row">
          <div className="col-md-2">
            <img src="../images/leo.png"/>
          </div>

          <div className="col-md-2">
            {patient.first_name}
          </div>

          <div className="col-md-2">
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
    )
  }
});
