var Reflux = require('reflux');

var NoteActions = {
  fetchNoteRequest: {asyncResult: true},
  fetchReasonRequest: {asyncResult: true},
  createCloseNoteRequest: {asyncResult: true},
  createEscalateNoteRequest: {asyncResult: true},
  scrollToNote: {}
};

module.exports = Reflux.createActions(NoteActions);
