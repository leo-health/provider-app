var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

module.exports = React.createClass({

  getInitialState: function () {
    return { shortened: false }
  },

  onClick: function() {
    this.props.onToggleInformation();
  },

  changeRecipientWidth: function() {
    this.setState({
      shortened: !this.state.shortened
    });
  },

  render: function() {
    var guardians = this.props.guardians;
    var patients = this.props.patients;
    var guardianDisplay = null;
    var patientDisplay = null;
    var userIcon = null;
    var patientIcon = null;
    var hyphenIcon = null;
    if (guardians) {
      userIcon = <span className="glyphicon glyphicon-user"></span>;
      guardianDisplay = guardians.map(function(guardian, i){
        if (i + 1 === guardians.length) {
          return (
            <div key={i} className="to-field--individual medium-font-size">{guardian.first_name} {guardian.last_name}</div>
          )
        } else {
          return (
            <div key={i} className="to-field--individual medium-font-size">{guardian.first_name} {guardian.last_name},</div>
          )
        }
      });
    }
    if (patients) {
      patientIcon = <span className="glyphicon glyphicon-ice-lolly to-field--individual orange-font"></span>;
      hyphenIcon = <div className="to-field--individual orange-font">|</div>;
      patientDisplay = patients.map(function(patient, i){
        if (i + 1 === patients.length) {
          return (
            <div key={i} className="to-field--individual medium-font-size orange-font">{patient.first_name} {patient.last_name}</div>
          )
        } else {
          return (
            <div key={i} className="to-field--individual medium-font-size orange-font">{patient.first_name} {patient.last_name},</div>
          )
        }
      });
    }

    return (
      <div className="recipient-field-container">
        <div className="pull-left to-field">
          <div className="to-field--list">
            {userIcon}
            {guardianDisplay}
            {hyphenIcon}
            {patientIcon}
            {patientDisplay}
          </div>
          <span className="glyphicon glyphicon-info-sign pull-right toggler"
                onClick={this.onClick}></span>
        </div>
      </div>
    )
  }
});
