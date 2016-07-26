var React = require('react'),
    moment = require('moment'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  handleDelete: function(){
    RegistrationActions.removePatientRequest({
      id: this.props.patient.id, authentication_token: sessionStorage.authenticationToken
    })
  },

  formatDisplay: function(patient){
    var avatarUrl;
    var nameText = patient.first_name + ' ' +  patient.last_name;
    var birthdayText = moment(patient.birth_date.substring(0, 10)).format('l');

    if(patient.sex === "M"){
      avatarUrl = "../../images/Avatar_Patient_Son.png";
    }else{
      avatarUrl = "../../images/Avatar_Patient_Daughter.png";
    }

    return(
      <span className="pull-left">
        <img className="patient-avatar pull-left" src={avatarUrl}/>
        <table>
          <tbody>
            <tr>
              <td className="right-padding">Child's Full Name</td>
              <td>Birthday</td>
              <td>Sex</td>
            </tr>
            <tr>
              <td>
                <p className="lead right-fix">{nameText}</p>
              </td>
              <td>
                <p className="lead right-fix">{birthdayText}</p>
              </td>
              <td>
                <p className="lead right-fix">{patient.sex}</p>
              </td>
            </tr>
          </tbody>
        </table>
     </span>
    )
  },

  render: function(){
    return(
      <div className="row well registration-well">
        <a className="icon" onClick={this.handleDelete}><span className="registration-icon glyphicon glyphicon-trash pull-right cursor"></span></a>
        <a className="icon" onClick={this.props.handleEdit}><span className="registration-icon glyphicon glyphicon-pencil pull-right cursor"></span></a>
        {this.formatDisplay(this.props.patient)}
      </div>
    )
  }
});
