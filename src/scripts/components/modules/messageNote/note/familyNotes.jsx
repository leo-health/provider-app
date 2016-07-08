var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var moment = require('moment');

module.exports = React.createClass({

  render: function() {
    var guardians = this.props.guardians;
    var patients = this.props.patients;
    var phoneList = null;
    var patientList = null;
    if (guardians) {
      console.log("GUARDIANS");
      console.log(guardians);
      phoneList = guardians.map(function(guardian, i){
        return (
          <div key={i} className="medium-font-size">{guardian.first_name} <span className="glyphicon glyphicon-earphone"></span> {guardian.phone} </div>
        )
      });
    }

    if (patients) {
      console.log("PATIENTS");
      console.log(patients);
      patientList = patients.map(function(patient, i){
        var birthday = patient.birth_date;
        var age = moment().diff(birthday, 'years') + " years";
        if (age === "0 years") {
          age = moment().diff(birthday,'months') + " months";
          if (age === "0 months") {
            age = moment().diff(birthday, 'days') + " days";
          }
        }
        return (
          <div key={i}>
            <div className="heavy-font-size child-title"><strong>{patient.first_name}, {patient.sex}:</strong></div>
            <div className="medium-font-size">Age: {age}</div>
          </div>

        )
      });
    }

    return (
      <div className="family-notes-container col-lg-3 pre-scrollable panel-body">
        <h4><strong>Family Details</strong></h4>
        {phoneList}
        {patientList}
      </div>
    )
  }
});
