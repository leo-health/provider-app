var Reflux = require('reflux');

var NoteActions = {
  fetchNoteRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(NoteActions);
