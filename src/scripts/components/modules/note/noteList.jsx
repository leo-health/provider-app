var React = require('react');
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
      var notes = _.filter(status.messages, function(m){return m.message_type != 'message'});
      this.setState({notes: notes, currentConversationId: status.currentConversationId})
    }
  },

  onNoteStatusChange: function(status){
    if(status.new_note){
      this.setState({notes: this.state.notes.concat(status.new_note)})
    }
  },

  getInitialState: function(){
    return{ notes: []}
  },

  componentDidMount: function(){
    this.props.stateChanel.bind('new_state', function(data){
      if(data.message_type != "open" && this.state.currentConversationId == data.conversation_id){
        NoteActions.fetchNoteRequest(localStorage.authenticationToken, data.id, data.message_type)
      }
    }, this)
  },

  render: function () {
    var notes = this.state.notes;
    if(notes && notes.length > 0){
      var initialIdentity = notes[0].id + notes[0].messageType;
      notes = notes.map(function(note, i){
        return <Note key={i}
                     id={note.id}
                     note={note.note}
                     sender={note.created_by}
                     sentAt={note.created_at}
                     messageType={note.message_type}
                     initialIdentity={initialIdentity}
                     element={this.props.element}
               />
      }, this);
    }
    return (
      <div id="notes-container" className="pre-scrollable panel panel-body">
        <h4>Notes</h4>
        {notes}
      </div>
    )
  }
});
