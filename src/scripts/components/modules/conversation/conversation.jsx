var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var leoUtil = require('../../../utils/common').StringUtils;
var moment = require('moment');
var ConversationState = require("./conversationState");
var ConversationPatient = require("./conversationPatient");
var ConversationGuardian = require("./conversationGuardian");
var MessageActions = require('../../../actions/messageActions');
var NoteActions = require('../../../actions/noteActions');
var ConversationStore = require('../../../stores/conversationStore');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ConversationStore, "onConversationStatusChange"),
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange')
  ],

  getInitialState: function() {
    return {
      lastMessage: this.props.initialLastMessage
    }
  },

  onMessageStatusChange: function(status){
    if(status.newMessage) {
      this.setState({
        lastMessage: status.newMessage.body
      })
    }
  },

  componentWillMount: function() {
    var channel = this.props.pusher.subscribe('private-conversation' + this.props.conversationId);
    channel.bind('new_message', function(data){
      this.fetchNewMessage(data)
    }, this);
  },

  fetchNewMessage: function(data) {
    var currentUser = JSON.parse(sessionStorage.user);

    if (currentUser.id != data.sender_id) {
      if (data.message_type === "message") {
        MessageActions.fetchMessageRequest(sessionStorage.authenticationToken, data.id);
      } else{
        NoteActions.fetchNoteRequest(sessionStorage.authenticationToken, data.id, data.message_type)
      }
    }
  },

  componentWillUnmount: function() {
    this.props.pusher.unsubscribe('private-conversation' + this.props.conversationId);
  },

  render: function () {
    if (this.props.primaryGuardian) var primaryGuardian =  leoUtil.formatName(this.props.primaryGuardian);
    var messageSendAt = moment(this.props.createdAt).format('L');
    var conversationState = this.props.conversationState;
    var conversationId = this.props.conversationId;
    var patients = this.props.patients.map(function(patient){
      return (
        <ConversationPatient key = {patient.id} patient = {leoUtil.formatName(patient)}/>
      )
    }.bind(this));

    var secondaryGuardians = _.filter(this.props.guardians, function(guardian){
      return guardian.id !=  this.props.primaryGuardian.id
    }.bind(this));

    secondaryGuardians = secondaryGuardians.map(function(guardian){
      return(
        <ConversationGuardian key={guardian.id} guardian = {leoUtil.formatName(guardian)}/>
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
          { leoUtil.shorten(this.state.lastMessage) }
        </p>
      </div>
    )
  }
});
