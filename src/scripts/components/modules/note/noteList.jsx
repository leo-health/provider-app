var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');
var NoteActions = require('../../../actions/noteActions');
var Note = require('./note');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange')
  ],

  onStatusChange: function (status) {
    if(status.messages){
      var notes = _.filter(status.messages, function(m){return m.message_type != 'message' || m.message_type != 'bot_message'});
      this.setState({notes: notes, currentConversationId: status.currentConversationId})
    }
  },

  onNoteStatusChange: function(status){
    if(status.new_note){
      this.setState({notes: this.state.notes.concat(status.new_note)})
    }
    if(status.highlightNoteKey){
      this.setState(status)
    }
  },

  getInitialState: function(){
    return{ notes: [] }
  },

  componentDidMount: function(){
    this.props.stateChannel.bind('new_state', function(data){
      if(data.message_type != "open" && this.state.currentConversationId == data.conversation_id){
        NoteActions.fetchNoteRequest(localStorage.authenticationToken, data.id, data.message_type)
      }
    }, this)
  },

  scrollElementIntoView: function(domNode){
    var containerDomNode = ReactDom.findDOMNode(domNode);
    var test = ReactDom.findDOMNode(this);
    test.scrollTop = containerDomNode.scrollHeight;
  },

  sethighlightNoteKey: function(notes){
    var initialNoteKey = _.first(notes).id.toString() + _.first(notes).message_type;
    var highlightNoteKey;
    if(this.state.highlightNoteKey){
      highlightNoteKey = this.state.highlightNoteKey
    }else{
      highlightNoteKey = initialNoteKey
    }
    return highlightNoteKey
  },

  setTagName: function(highlightNoteKey, note){
    var tagName;
    if(highlightNoteKey == note.id.toString() + note.message_type) {
      tagName = 'blockquote'
    }else{
      tagName = 'div'
    }
    return tagName
  },

  render: function () {
    var notes = this.state.notes;
    if(notes && notes.length > 0){
      debugger
      var highlightNoteKey = this.sethighlightNoteKey(notes);
      notes = notes.map(function(note, i){
        var tagName = this.setTagName(highlightNoteKey, note);
        return <Note key={i}
                     reactKey={i}
                     id={note.id}
                     note={note.note}
                     sender={note.created_by}
                     sentAt={note.created_at}
                     messageType={note.message_type}
                     tagName={tagName}
                     scrollIntoView={this.scrollElementIntoView}
               />
      }, this);
    }else{
      notes = <div> Be the first to share context with your colleagues when escalating and closing conversations. Remember to use search to find and check in on your patients! </div>;
    }
    return (
      <div id="notes-container" className="pre-scrollable panel panel-body">
        <h4>Notes</h4>
        {notes}
      </div>
    )
  }
});
