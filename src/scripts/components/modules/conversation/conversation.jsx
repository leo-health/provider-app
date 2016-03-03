var React = require('react');
var _ = require('lodash');
var leoUtil = require('../../../utils/common').StringUtils;
var moment = require('moment');
var ConversationState = require("./conversationState");
var ConversationPatient = require("./conversationPatient");
var ConversationGuardian = require("./conversationGuardian");
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  render: function () {
    var lastMessage = this.props.lastMessage;
    var primaryGuardian = this.props.primaryGuardian;
    primaryGuardian = leoUtil.formatName(primaryGuardian);
    lastMessage = leoUtil.shorten(lastMessage);

    var messageSendAt = moment(this.props.createdAt).format('L');
    var conversationState = this.props.conversationState;
    var conversationId = this.props.conversationId;
    var patients = this.props.patients.map(function(patient){
      var patientName = leoUtil.formatName(patient);
      return (
        <ConversationPatient key = {patient.id} patient = {patientName}/>
      )
    }.bind(this));

    var secondaryGuardians = _.filter(this.props.guardians, function(guardian){
      return guardian.id !=  this.props.primaryGuardian.id
    }.bind(this));

    secondaryGuardians = secondaryGuardians.map(function(guardian){
      var guardianName = leoUtil.formatName(guardian);
      return(
        <ConversationGuardian key={guardian.id} guardian = {guardianName}/>
      )
    }.bind(this));

    return(
      <div href="#" className={this.props.selected ? "list-group-item active" : "list-group-item"} onClick={this.props.onClick}>
        <h6 className="list-group-item-heading">{primaryGuardian}
          <span className="pull-right">{messageSendAt}</span>
        </h6>
        <div>
          {secondaryGuardians}
        </div>
        <p className = "patientList">
          {patients}
          <ConversationState conversationState = {conversationState} conversationId = {conversationId}/>
        </p>
        <p className="list-group-item-text">
          {lastMessage}
        </p>
      </div>
    )
  }
});
