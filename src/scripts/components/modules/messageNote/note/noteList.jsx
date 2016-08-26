var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var MessageStore = require('../../../../stores/messageStore');
var NoteStore = require('../../../../stores/noteStore');
var ConversationStore = require('../../../../stores/conversationStore');
var NoteActions = require('../../../../actions/noteActions');
var Note = require('./note');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(NoteStore, 'onNoteStatusChange'),
  ],

  getInitialState: function() {
    return { highlightNoteKey: undefined }
  },

  componentWillReceiveProps: function(newProps) {
    // reset the highlighted note key when the conversation changes, or it is not yet defined
    if (!this.state.highlightNoteKey || newProps.currentConversationId !== this.props.currentConversationId) {
      var note = newProps.notes[0];
      if (note) {
        var initialNoteKey = note.id.toString() + note.message_type;
        this.setState({ highlightNoteKey: initialNoteKey });
      }
    }
  },

  componentDidUpdate: function() {
    // scroll the highlighted note into view
    var highlightedNode = ReactDom.findDOMNode(this.refs[this.state.highlightNoteKey]);
    var container = ReactDom.findDOMNode(this.refs.notesContainer);
    if (highlightedNode && container) {
      container.scrollTop = highlightedNode.offsetTop;
    }
  },

  onNoteStatusChange: function(status) {
    if(status.highlightNoteKey) {
      this.setState(status)
    }
  },

  shouldHighlightNote: function(note){
    return this.state.highlightNoteKey === this.refNameForNote(note);
  },

  refNameForNote: function(note) {
      return note.id.toString() + note.message_type;
  },

  render: function () {
    var notes = this.props.notes;

    if(notes && notes.length > 0){
      var highlightNoteKey = this.state.highlightNoteKey;
      notes = notes.map(function(note, i){

        var tagName = this.shouldHighlightNote(note) ? 'blockquote' : 'div';
        var description;
        if (note.message_type == "escalated" || note.note !== "") {
          description = note.note;
        } else if (note.closure_reason) {
          description = _.capitalize(note.closure_reason.long_description);
        }

        return <Note key={i}
                     reactKey={i}
                     id={note.id}
                     note={description}
                     sender={note.created_by}
                     sentAt={note.created_at}
                     messageType={note.message_type}
                     escalatedTo={note.escalated_to}
                     tagName={tagName}
                     ref={this.refNameForNote(note)}
               />
      }, this);
    }else{
      notes = <div className="medium-font-size"> Be the first to share context with your colleagues when escalating and closing conversations. Remember to use search to find and check in on your patients! </div>;
    }

    return (
      <div className="notes-container panel panel-body">
        <div className="notes-title title-font-size"><span>Notes</span></div>
        <div className="pre-scrollable auto-scroll" ref="notesContainer">
          {notes}
        </div>
      </div>
    )
  }
});
