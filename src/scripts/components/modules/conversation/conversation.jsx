var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var ConversationState = require("./conversationState");
var ConversationPatient = require("./conversationPatient");
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  render: function () {
    var lastMessage = this.props.lastMessage;
    var guardian = this.props.guardian;
    guardian = guardian.title + guardian.first_name + " " + guardian.last_name;
    if( lastMessage.length > 150 ){
      var shortMessage = lastMessage.substr(0, 150);
      lastMessage = shortMessage.substr(0, shortMessage.lastIndexOf(" ")) + "...";
    }
    var messageSendAt = moment(this.props.createdAt).calendar();
    var conversationState = this.props.conversationState;
    var conversationId = this.props.conversationId;
    var patients = this.props.patients.map(function(patient){
      return (
        <ConversationPatient key = {patient.id}
                             patient = { patient.first_name + " " + patient.last_name}
        />
      )
    });
    return(
      <div href="#" className={this.props.selected ? "list-group-item active" : "list-group-item"} onClick={this.props.onClick}>
        <h6 className="list-group-item-heading">{guardian}
          <span className="pull-right">{messageSendAt}</span>
        </h6>
        <p className = "patientList">
          {patients}
          <ConversationState conversationState = {conversationState} conversationId = {conversationId} stateChannel = {this.props.stateChannel}/>
        </p>
        <p className="list-group-item-text">
          {lastMessage}
        </p>
      </div>
    )
  }
});
