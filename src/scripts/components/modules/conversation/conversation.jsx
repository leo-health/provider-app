var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var leoUtil = require('../../../utils/common').StringUtils;
var moment = require('moment');
var ConversationState = require("./conversationState");
var ConversationPatient = require("./conversationPatient");
var ConversationGuardian = require("./conversationGuardian");
var ConversationActions = require('../../../actions/conversationActions');
var MessageActions = require('../../../actions/messageActions');
var NoteActions = require('../../../actions/noteActions');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange')
  ],

  onMessageStatusChange: function(status){
    if( status.newMessage ){
      if(!this.isSameConversation(status.newMessage.conversation_id)) return;
      if(this.props.currentListState === "closed"){
        this.handleNewMessageInClosedState();
      }else{
        var that = this;
        this.props.moveConversationToTop(that.props.reactKey, status.newMessage.body);
      }
    }
  },

  onNoteStatusChange: function(status){
    if( status.newNote ){
      if(!this.isSameConversation(status.newNote.conversation_id)) return;
      if(this.props.selected) {

      }else{
        this.removeConversation(status)
      }
    }
  },

  isSameConversation: function(conversationId) {
    return conversationId === this.props.conversationId
  },

  handleNewMessageInClosedState: function(){
    if(this.props.selected){
      ConversationActions.fetchConversationsRequest( sessionStorage.authenticationToken, 'open', 1 );
    }else{
      this.props.removeConversationFromList(this.props.conversationId)
    }
  },

  removeConversation: function (status) {
    switch (this.props.currentListState) {
      case "escalation":
        if(status.newNote.message_type === "close") this.props.removeConversationFromList(this.props.conversationId);
        break;
      case "open":
        if(status.newNote.message_type === "close" || status.newNote.message_type == "escalation"){
          this.props.removeConversationFromList(this.props.conversationId)
        }
        break;
    }
  },

  componentWillMount: function() {
    if(this.props.conversationId) var channel = this.props.pusher.subscribe('private-conversation' + this.props.conversationId);
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
          { leoUtil.shorten(this.props.lastMessage) }
        </p>
      </div>
    )
  }
});
