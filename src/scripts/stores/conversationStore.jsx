var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions'),
    MessageActions = require('../actions/messageActions'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationRequest: function(authenticationToken, state){
    if (state.length > 0){
      var conversationParams = {authentication_token: authenticationToken, state: state}
    }else{
      conversationParams = {authentication_token: authenticationToken}
    }
    request.get('http://localhost:3000/api/v1/conversations')
           .query(conversationParams)
           .end(function(err, res){
              if(res.ok){
                ConversationActions.fetchConversationRequest.completed(res.body, state)
              }else{
                ConversationActions.fetchConversationRequest.failed(res.body)
              }
            })
  },

  onFetchConversationRequestCompleted: function(response, state){
    var conversations = response.data.conversations;
    if (conversations.length > 0){
      var firstConversationId = response.data.conversations[0].id;
      MessageActions.fetchMessagesRequest(localStorage.authenticationToken, firstConversationId);
      //NoteActions.fetchNoteRequest(localStorage.authenticationToken, firstConversationId) ;
    }
    this.trigger({ status: response.status,
                   conversations: conversations,
                   init: true,
                   conversationState: state
                  });
  },

  onFetchConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching conversations"})
  },

  onSelectConversation: function(selectedConversation){
    this.trigger({selectedConversation: selectedConversation})
  },

  onCloseConversationRequest: function(authenticationToken, conversationId){
    request.put('http://localhost:3000/api/v1/conversations/' + conversationId + '/close')
           .query({ authentication_token: authenticationToken })
           .end(function(err, res){
             if(res.ok){
               ConversationActions.closeConversationRequest.completed(res.body)
             }else{
               ConversationActions.closeConversationRequest.failed(res.body)
             }
           })
  },

  onCloseConversationRequestCompleted: function(response){
    this.trigger({status: response.status,
                  closedConversation: response.data.conversation})
  },

  onCloseConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error closing conversation"})
  },

  onEscalateConversationRequest: function(authenticationToken, conversationId, escalatedToId, note, priority){
    escalateParams = { authentication_token: authenticationToken,
                       escalated_to_id: escalatedToId,
                       note: note,
                       priority: priority
                      };
    request.put('http://localhost:3000/api/v1/conversations/' + conversationId + '/escalate')
           .query(escalateParams)
           .end(function(err, res){
              if(res.ok){
                ConversationActions.escalateConversationRequest.completed(res.body)
              }else{
                ConversationActions.escalateConversationRequest.failed(res.body)
              }
            })
  },

  onEscalateConversationRequestCompleted: function(response){
    debugger;
    this.trigger({status: response.status})
  },

  onEscalateConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error escalating conversation"})
  }
});
