var Reflux = require('reflux'),
    request = require('superagent'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [NoteActions],
  
  onFetchNoteRequest: function (authenticationToken, noteId, messageType) {
    request.get('http://localhost:3000/api/v1/notes/'+ noteId)
           .query({ authentication_token: authenticationToken, note_type: messageType })
           .end(function(err, res){
              if(res.ok){
                NoteActions.fetchNoteRequest.completed(res.body)
              }else{
                NoteActions.fetchNoteRequest.failed(res.body)
              }
            })
  },

  onFetchNoteRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   new_note: response.data.note
                  })
  },

  onFetchNoteRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching notes"})
  }
});
