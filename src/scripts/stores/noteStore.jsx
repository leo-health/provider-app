var Reflux = require('reflux'),
    request = require('superagent'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [NoteActions],

  onFetchNoteRequest: function (authenticationToken, noteId, messageType) {
    request.get(leo.API_URL+"/notes/"+ noteId)
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
                   newNote: response.data.note
                  })
  },

  onFetchNoteRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching notes"})
  },

  onScrollToNote: function(highlightNoteKey){
    this.trigger({highlightNoteKey: highlightNoteKey})
  },

  onCreateCloseNoteRequest: function(authenticationToken, conversationId, note){
    request.put(leo.API_URL+"/conversations/" + conversationId + "/close")
        .query({ authentication_token: authenticationToken, note: note })
        .end(function(err, res){
          if(res.ok){
            NoteActions.createCloseNoteRequest.completed(res.body)
          }else{
            NoteActions.createCloseNoteRequest.failed(res.body)
          }
        })
  },

  onCreateCloseNoteRequestCompleted: function(response){
    this.trigger({
      status: response.status,
      newNote: response.data
    })
  },

  onCreateCloseNoteRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "error closing conversation"
    })
  },

  onCreateEscalateNoteRequest: function(authenticationToken, conversationId, escalatedToId, note, priority){
    escalateParams = {
      authentication_token: authenticationToken,
      escalated_to_id: escalatedToId,
      note: note,
      priority: priority
    };

    request.put(leo.API_URL+"/conversations/" + conversationId + "/escalate")
        .query(escalateParams)
        .end(function(err, res){
          if(res.ok){
            NoteActions.createEscalateNoteRequest.completed(res.body)
          }else{
            NoteActions.createEscalateNoteRequest.failed(res.body)
          }
        })
  },

  onCreateEscalateNoteRequestCompleted: function(response){
    this.trigger({
      status: response.status,
      newNote: response.data
    });
  },

  onCreateEscalateNoteRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "error escalating conversation"
    })
  }
});
