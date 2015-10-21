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
      var notes = _.filter(status.messages, function(m){return m.message_type != 'message'})
      this.setState({notes: notes})
    }
  },

  getInitialState: function(){
    return{ notes: []}
  },

  componentDidMount: function(){
    NoteActions.fetchNoteRequest(localStorage.authentication_token);
  },

  render: function () {
    var notes = this.state.notes;
    if(notes && notes.length > 0){
      notes = notes.map(function(note, i){
        return <Note key={i}
                     note={note.note}
                     sender={note.created_by}
                     sentAt={note.created_at}/>
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
