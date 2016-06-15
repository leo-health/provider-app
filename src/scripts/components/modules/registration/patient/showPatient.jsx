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
    var text, avatar_url;
    name_text = patient.first_name + ' ' +  patient.last_name;
    birthday_text = moment(patient.birth_date.substring(0, 10)).format('l');

    if(patient.sex === "M"){
      avatar_url = "../images/Avatar_Patient_Son.png";
    }else{
      avatar_url = "../images/Avatar_Patient_Daughter.png";
    }

    return <span className="pull-left">
      <img className="patient-avatar pull-left" src={avatar_url}/>
      <table class="table">
        <tbody>
          <tr>
            <td>Full name</td>
            <td>Sex</td>
            <td>Birthday</td>
          </tr>
          <tr>
            <td>
              <p className="lead right-fix">{name_text}</p>
            </td>
            <td>
              <p className="lead  right-fix">{patient.sex}</p>
            </td>
            <td><p className="lead  right-fix">{birthday_text}</p></td>
          </tr>
        </tbody>
      </table>
     </span>
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
