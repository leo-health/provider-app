var React = require('react');
var Reflux = require('reflux');
var MessageStore = require('../../../stores/messageStore');
var NoteActions = require('../../../actions/noteActions');
var Note = require('./note');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onStatusChange')
  ],

  onStatusChange: function (status) {
    if(status.messages){
      var notes = _.filter(status.messages, function(m){return m.message_type != 'message'});
      this.setState({notes: notes})
    }
  },

  getInitialState: function(){
    return{ notes: []}
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
                     message={note.message_type}
                     initialIdentity={initialIdentity}
               />
      });
    }
    return (
      <div id="notes-container" className="pre-scrollable panel panel-body">
        <h4>Notes</h4>
        {notes}
      </div>
    )
  }
});
