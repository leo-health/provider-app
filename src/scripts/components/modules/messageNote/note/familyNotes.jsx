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
      phoneList = guardians.map(function(guardian, i){
        return (
          <div key={i} className="medium-font-size">{guardian.first_name} <span className="glyphicon glyphicon-earphone"></span> {guardian.email} </div>
        )
      });
    }

    if (patients) {
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
        console.log(birthday);
        return (
          <div key={i}>
            <div className="heavy-font-size">{patient.first_name}, {patient.sex}</div>
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
