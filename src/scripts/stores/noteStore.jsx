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
    this.trigger({
      status: response.status,
      newNote: response.data.note
    });
  },

  onFetchNoteRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching notes"})
  },

  onScrollToNote: function(highlightNoteKey){
    this.trigger({highlightNoteKey: highlightNoteKey})
  },

  onCreateCloseNoteRequest: function(authenticationToken, conversationId, hasNote, note, reasonId){
    if (hasNote && note === "") {
      var response = { status: "error" };
      NoteActions.createCloseNoteRequest.failed(response);
    }
    else {
      request.put(leo.API_URL+"/conversations/" + conversationId + "/close")
        .query({ authentication_token: authenticationToken, note: note , reasonId: reasonId})
        .end(function(err, res){
          if(res.ok){
            NoteActions.createCloseNoteRequest.completed(res.body)
          }else{
            NoteActions.createCloseNoteRequest.failed(res.body)
          }
        })
    }
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
  },

  onFetchReasonRequest: function(authenticationToken){
    request.get(leo.API_URL+"/conversations/closure_reasons")
        .query({authentication_token: authenticationToken})
        .end(function(err, res){
          if(res.ok){
            NoteActions.fetchReasonRequest.completed(res.body)
          }else{
            NoteActions.fetchReasonRequest.failed(res.body)
          }
        })
  },

  onFetchReasonRequestCompleted: function(response){
    var reasons = response.data.reasons;
    this.trigger({
      status: response.status,
      reasonSelection: reasons
    })
  },

  onFetchReasonRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "error fetching closure reasons"
    })
  }
});
