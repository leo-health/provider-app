var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return({
      editFamily: "edit"
    })
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
        editFamily: "save"
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
        editFamily: "edit"
      })
    }
  },

  render: function(){
    var patient = this.props.patient;
    //var firstName = this.props.firstName;
    //var lastName = this.props.lastName;
    //var sex = this.props.sex;
    //var birthDate = this.props.birthDate;

    //if(this.state.editFamily === "save"){
    //  firstName = React.createElement('input', {defaultValue: firstName, type: "text", className: "form-control", ref: "firstName"});
    //  lastName = React.createElement('input', {defaultValue: lastName, type: "text", className: "form-control", ref: "lastName"});
    //  sex = React.createElement('input', {defaultValue: sex, type: "text", className: "form-control", ref: "sex"});
    //  birthDate = React.createElement('input', {defaultValue: birthDate, type: "text", className: "form-control", ref: "birthDate"});
    //}

    return(
        <div className="row">
          <div className="form-group col-sm-3">
            {patient.firstName}
          </div>

          <div className="form-group col-sm-3">
            {patient.lastName}
          </div>

          <div className="form-group col-sm-2">
            {patient.sex}
          </div>

          <div className="form-group col-sm-3">
            {patient.birthDate}
          </div>

          <div className="form-group col-sm-2 col-sm-offset-8">
            <a onClick={this.deletePatient}>delete</a>
          </div>

          <div className="form-group col-sm-2">
            <a onClick={this.updatePatient}>{this.state.editFamily}</a>
          </div>
          <br/>
        </div>
    )
  }
});