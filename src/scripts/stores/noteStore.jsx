var Reflux = require('reflux'),
    request = require('superagent'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [NoteActions],
  
  onFetchNoteRequest: function (authenticationToken, conversationId) {
    request.get('http://localhost:3000/api/v1/conversations/'+ conversationId + '/escalation_notes')
           .query({ authentication_token: authenticationToken })
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
                   notes: response.data.escalation_notes
                  })
  },

  onFetchNoteRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching notes"})
  }
});
