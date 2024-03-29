var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var leoUtil = require('../../../utils/common').StringUtils;
var moment = require('moment');
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
        this.props.moveConversationToTop(that.props.reactKey, status.newMessage);
      }
    }
  },

  onNoteStatusChange: function(status){
    if( status.newNote ){
      if(!this.isSameConversation(status.newNote.conversation_id)) return;

      if(this.props.selected) {
        if (this.props.currentListState === "escalated" && this.props.selectedStaff && status.newNote.message_type === "escalation") {
          ConversationActions.fetchStaffConversation(sessionStorage.authenticationToken, status.newNote.escalated_to, this.props.currentListState);
        } else {
          ConversationActions.fetchConversationsRequest( sessionStorage.authenticationToken, this.mapConversationState(status.newNote.message_type), 1);
        }
      } else {
        this.removeConversation(status)
      }
    }
  },

  mapConversationState: function(state) {
    return state === "escalation" ? "escalated" : "closed"
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

  componentWillReceiveProps: function(newProps) {
    this.subscribeToPusher(newProps);
  },

  subscribeToPusher: function(newProps) {
    if(newProps.conversationId) {
      var channelName = 'private-conversation' + newProps.conversationId;
      var channel = newProps.pusher.channel(channelName);

      if (!channel) {
        this.unsubscribeFromPusher();
        channel = newProps.pusher.subscribe(channelName);
        channel.bind('new_message', function(data){
          if (!window.windowHasFocus) {
            if (data && data.message_type === "message") {
              window.flashTitle("You have a new message", 20)
            } else {
              window.flashTitle("You have a new note", 20)
            }
          }
          this.fetchNewMessage(data)
        }, this);
      }
    }
  },

  unsubscribeFromPusher: function() {
    var oldChannelName = 'private-conversation' + this.props.conversationId;
    this.props.pusher.unsubscribe(oldChannelName);
  },

  componentWillMount: function() {
    this.subscribeToPusher(this.props);
  },

  componentWillUnmount: function() {
    this.unsubscribeFromPusher();
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

  render: function () {
    if (this.props.primaryGuardian) var primaryGuardian =  leoUtil.formatName(this.props.primaryGuardian);
    var sentToday = moment(this.props.createdAt).isSame(moment(), 'day');
    var timeFromNow = moment(this.props.createdAt).fromNow();
    var dateTime = moment(this.props.createdAt).format('L');
    var messageSendAt = (sentToday) ? timeFromNow : dateTime;
    var conversationId = this.props.conversationId;

    var secondaryGuardians = _.filter(this.props.guardians, function(guardian){
      return guardian.id !=  this.props.primaryGuardian.id
    }.bind(this));

    var patients = this.props.patients.map(function(patient, i){
      var commaValue;
      if (i < (this.props.patients.length - 1)) { commaValue = ", " }
      return (
        <span className="child-label" key={patient.id}>
          <ConversationPatient patient={leoUtil.formatName(patient)}/>{ commaValue }
        </span>
      );
    }.bind(this));

    var guardianIcon;
    if (secondaryGuardians.length > 0) {
      var guardianIcon = <i className="fa fa-user fa-lg"></i>
    };

    secondaryGuardians = secondaryGuardians.map(function(guardian, i){
      var commaValue;
      if (i < (secondaryGuardians.length - 1)) { commaValue = ", " }
      return (
        <span key={guardian.id} className="guardian-name">
          <ConversationGuardian guardian={leoUtil.formatName(guardian)}/>{ commaValue }
        </span>
      );
    }.bind(this));

    var escalatedInitials
    if (this.props.escalatedTo) escalatedInitials = this.props.escalatedTo.first_name[0] + this.props.escalatedTo.last_name[0]

    return(
      <div className={this.props.selected ? "list-group-item active default-cursor" : "list-group-item cursor"} onClick={this.props.onClick}>
        <h6 className="list-group-item-heading heavy-font-size primary-label">{primaryGuardian}
          <span className="pull-right message-date">{messageSendAt}</span>
        </h6>
        <div className="secondary-label">
          {guardianIcon}
          {secondaryGuardians}
        </div>
        <p className = "patient-list">
          <i className="fa fa-child fa-lg"></i>
          {patients}
        </p>
        <p className="list-group-item-text medium-font-size dark-gray-font">
          {leoUtil.shorten(this.props.lastMessage)}
        </p>
        <p className="list-group-item-text heavy-font-size dark-gray-font pull-right escalated-to">{escalatedInitials}</p>
      </div>
    )
  }
});
