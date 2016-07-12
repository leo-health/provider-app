var React = require('react');
var Reflux = require('reflux');
var MessageList = require('./message/messageList');
var FamilyNotes = require('./note/familyNotes');
var NoteList = require('./note/noteList');
var _ = require('lodash');
var classNames = require('classnames');
var RecipientField = require('./recipientField');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');
var ConversationStore = require('../../../stores/conversationStore');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange'),
  ],

  getInitialState: function() {
    return{
      messages: [],
      currentConversationId: undefined,
      offset: 0,
      page: 1,
      hiddenNotes: true
    }
  },

  onNoteStatusChange: function(status){
    if(status.newNote && status.newNote.conversation_id === this.state.currentConversationId) {
      this.setState({
        messages: this.state.messages.concat(status.newNote),
        offset: this.state.offset += 1
      })
    }
  },

  currentConversationIsSameAs: function(conversation_id) {
    return this.state.currentConversationId === conversation_id;
  },

  onMessageStatusChange: function(status){
    if(status.newMessage) {

      var newMessage = {
        body: status.newMessage.body,
        created_by: status.newMessage.sender,
        created_at: status.newMessage.created_at,
        message_type: 'message',
        type_name: status.newMessage.type_name,
        conversation_id: status.newMessage.conversation_id
      };

      if (this.currentConversationIsSameAs(newMessage.conversation_id)) {
        this.setState({
          messages: this.state.messages.concat(newMessage),
          offset: this.state.offset += 1
        });
      }
    }

    if(status.newBatchMessages){
      this.setState({
        messages: status.newBatchMessages.concat(this.state.messages),
        currentConversationId: status.currentConversationId,
        page: this.state.page += 1
      })
    }

    if(status.messages) {
      this.setState({
        messages: status.messages,
        currentConversationId: status.currentConversationId,
        page: 2
      })
    }
  },

  onToggleInformation: function(){
    this.setState({
      hiddenNotes: !this.state.hiddenNotes
    });
  },

  render: function() {
    var messageSize = classNames({
      'message-container': true,
      'col-lg-9': this.state.hiddenNotes,
      'col-lg-6': !this.state.hiddenNotes
    });

    var noteSize = classNames({
      'hidden-notes': this.state.hiddenNotes,
      'col-lg-3': !this.state.hiddenNotes
    });

    return (
      <div>
        <div className={messageSize}>
          <RecipientField onToggleInformation={this.onToggleInformation}
                          guardians={this.props.guardians}
                          patients={this.props.patients}
          />
          <MessageList messages={this.state.messages}
                       conversation={this.props.conversation}
                       page={this.state.page}
                       offset={this.state.offset}
                       staff={this.props.staff}
          />
        </div>
        <div className={noteSize}>
          <FamilyNotes guardians={this.props.guardians}
                       patients={this.props.patients}
          />
          <NoteList
            currentConversationId={this.state.currentConversationId}
            notes={ _.filter(this.state.messages, function(m){return !m.message_type.includes('message', 'bot_message')}) }/>
        </div>
      </div>
    )
  }
});
