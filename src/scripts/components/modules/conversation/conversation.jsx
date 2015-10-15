var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var moment = require('moment');
var ConversationStore = require('../../../stores/conversationStore');
var ConversationState = require("./conversationState");
var ConversationPatient = require("./conversationPatient");
var MessageActions = require('../../../actions/messageActions');
var ConversationActions = require('../../../actions/conversationActions');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ConversationStore, "onStatusChange")],

  handleOnClick: function(){
    ConversationActions.selectConversation(this.props.reactKey);
    MessageActions.fetchMessagesRequest(localStorage.authenticationToken, this.props.conversationId);
  },

  onStatusChange: function(status){
    this.setState(status);
    if (status.init){
      this.setState({selectedConversation: 0})
    }
  },

  getInitialState: function () {
    return {selectedConversation: 0}
  },

  render: function () {
    var lastMessage = this.props.lastMessage.body;
    var guardian = this.props.guardian;
    guardian = guardian.title + guardian.first_name + " " + guardian.last_name;
    if( lastMessage.length > 150 ){
      var shortMessage = lastMessage.substr(0, 150);
      lastMessage = shortMessage.substr(0, shortMessage.lastIndexOf(" ")) + "...";
    }
    var messageSendAt = moment(this.props.createdAt).calendar();
    var conversationStatus = this.props.conversationStatus;
    var conversationId = this.props.conversationId;
    var patients = this.props.patients.map(function(patient){
      return (
        <ConversationPatient key = {patient.id}
                             patient = { patient.first_name + " " + patient.last_name}
        />
      )
    });

    return(
      <div onClick={this.handleOnClick}>
        <a href="#" className={this.state.selectedConversation == this.props.reactKey ? "list-group-item active" : "list-group-item"}>
          <h6 className="list-group-item-heading">{guardian}<span>id: {conversationId}</span>
            <span className="pull-right">{messageSendAt}</span>
          </h6>
          <p className = "patientList">
            {patients}
            <ConversationState state = {conversationStatus} conversationId = {conversationId} statusChanel = {this.props.statusChanel}/>
          </p>
          <p className="list-group-item-text">
            {lastMessage}
          </p>
        </a>
      </div>
    )
  }
});
