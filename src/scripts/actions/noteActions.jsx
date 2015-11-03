var Reflux = require('reflux');

var NoteActions = {
  fetchNoteRequest: {asyncResult: true},
  scrollToNote: {}
};

module.exports = Reflux.createActions(NoteActions);
