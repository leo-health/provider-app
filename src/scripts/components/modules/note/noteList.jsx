var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');
var ConversationStore = require('../../../stores/conversationStore');
var NoteActions = require('../../../actions/noteActions');
var Note = require('./note');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange'),
    Reflux.listenTo(ConversationStore, 'onConversationStatusChange')
  ],

  getInitialState: function(){
    return{ notes: [] }
  },

  onConversationStatusChange: function(status) {
    if(status.newNote) {
      this.setState({
        notes: this.state.notes.concat(status.newNote)
      })
    }
  },

  onMessageStatusChange: function(status) {
    var notes;
    if(status.messages){
      notes = status.messages;
    } else if (status.newBatchMessages) {
      notes = status.newBatchMessages.concat(this.state.notes);
    }

    if (notes) {
      notes = _.filter(notes, function(m){return !m.message_type.includes('message', 'bot_message')});
      this.setState({notes: notes, currentConversationId: status.currentConversationId});
    }
  },

  onNoteStatusChange: function(status) {
    if(status.newNote) {
      this.setState({
        notes: this.state.notes.concat(status.newNote)
      })
    }

    if(status.highlightNoteKey) {
      this.setState(status)
    }
  },

  setHighlightNoteKey: function(notes){
    var initialNoteKey = _.first(notes).id.toString() + _.first(notes).message_type;
    var highlightNoteKey = this.state.highlightNoteKey ?  this.state.highlightNoteKey : initialNoteKey
    return highlightNoteKey
  },

  setTagName: function(highlightNoteKey, note){
    var tagName = highlightNoteKey == (note.id.toString() + note.message_type) ? 'blockquote' : 'div'
    return tagName
  },

  render: function () {
    var notes = _.filter(this.state.notes, function(n){
      return n.note !== ""
    });

    if(notes && notes.length > 0){
      var highlightNoteKey = this.setHighlightNoteKey(notes);

      notes = notes.map(function(note, i){
        var tagName = this.setTagName(highlightNoteKey, note);
        return <Note key={i}
                     reactKey={i}
                     id={note.id}
                     note={note.note}
                     sender={note.created_by}
                     sentAt={note.created_at}
                     messageType={note.message_type}
                     escalatedTo={note.escalated_to}
                     tagName={tagName}
               />
      }, this);
    }else{
      notes = <div> Be the first to share context with your colleagues when escalating and closing conversations. Remember to use search to find and check in on your patients! </div>;
    }
    return (
      <div className="pre-scrollable panel panel-body">
        <h4>Notes</h4>
        {notes}
      </div>
    )
  }
});
