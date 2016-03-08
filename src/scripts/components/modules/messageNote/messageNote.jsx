var React = require('react');
var Reflux = require('reflux');
var MessageList = require('./message/messageList');
var NoteList = require('./note/noteList');
var _ = require('lodash');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');
var ConversationStore = require('../../../stores/conversationStore');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange'),
    Reflux.listenTo(ConversationStore, 'onConversationStatusChange')
  ],

  getInitialState: function() {
    return{
      messages: undefined,
      currentConversationId: undefined,

    }
  },

  onConversationStatusChange: function(status){

  },

  onNoteStatusChange: function(status){

  },

  onMessageStatusChange: function(status){

  },

  render: function() {
    return (
      <div>
        <div className="col-lg-9">
          <MessageList/>
        </div>
        <div className="col-lg-3">
          <NoteList pusher={this.pusher}/>
        </div>
      </div>
    )
  }
});
