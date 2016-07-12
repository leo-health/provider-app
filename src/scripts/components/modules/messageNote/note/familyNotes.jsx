var React = require('react');
var _ = require('lodash');
var moment = require('moment');
module.exports = React.createClass({

  processAge: function(patients) {
    var patientList = patients.map(function(patient, i){
      var birthday = patient.birth_date;
      var age = moment().diff(birthday, 'years')
      age += (age === 1) ? " year" : " years";
      if (age === "0 years") {
        age = moment().diff(birthday,'months');
        age += (age === 1) ? " month" : " months";
        if (age === "0 months") {
          age = moment().diff(birthday, 'days');
          age += (age === 1 || age === 0) ? " day" : " days";
        }
      }
      return (
        <div key={i}>
          <div className="heavy-font-size child-title"><strong>{patient.first_name}, {patient.sex}:</strong></div>
          <div className="medium-font-size">Age: {age}</div>
        </div>
      )
    });
    return patientList;
  },

  processPhoneNumber: function(guardians) {
    var phoneList = guardians.map(function(guardian, i){
      var phone = guardian.phone;
      var preProcessed = (""+phone).replace(/\D/g, '');
      var matched = preProcessed.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (matched) { phone = "(" + matched[1] + ") " + matched[2] + "-" + matched[3]; }
      return (
        <div key={i} className="medium-font-size">{guardian.first_name} <span className="glyphicon glyphicon-earphone"></span> {phone} </div>
      )
    });
    return phoneList;
  },

  render: function() {
    var guardians = this.props.guardians;
    var patients = this.props.patients;
    var phoneList, patientList, emptyNote;

    if (guardians) {
      phoneList = this.processPhoneNumber(guardians);
    } else {
      emptyNote = <div className="medium-font-size">No family details to display.</div>
    }

    if (patients) { patientList = this.processAge(patients); }

    return (
      <div className="family-notes-container col-lg-3 pre-scrollable panel-body">
        <h4><strong>Family Details</strong></h4>
        {phoneList}
        {patientList}
        {emptyNote}
      </div>
    )
  }
});
