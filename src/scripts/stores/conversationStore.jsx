var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions'),
    MessageActions = require('../actions/messageActions'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationRequest: function(authenticationToken, state){
    var conversationParams;
    if (state.length > 0){
      conversationParams = {authentication_token: authenticationToken, state: state}
    }else{
      conversationParams = {authentication_token: authenticationToken}
    }
    request.get('https://dev.leoforkids.com/api/v1/conversations')
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
    }else{
      MessageActions.notifyNoneMessage();
    }

    this.trigger({ status: response.status,
                   conversations: conversations,
                   conversationState: state
                  });
  },

  onFetchConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching conversations"})
  },

  onCloseConversationRequest: function(authenticationToken, conversationId, note){
    request.put('https://dev.leoforkids.com/api/v1/conversations/' + conversationId + '/close')
           .query({ authentication_token: authenticationToken, note: note })
           .end(function(err, res){
             if(res.ok){
               ConversationActions.closeConversationRequest.completed(res.body)
             }else{
               ConversationActions.closeConversationRequest.failed(res.body)
             }
           })
  },

  onCloseConversationRequestCompleted: function(response){
    this.trigger({status: response.status})
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
    request.put('https://dev.leoforkids.com/api/v1/conversations/' + conversationId + '/escalate')
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
    this.trigger({status: response.status})
  },

  onEscalateConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error escalating conversation"})
  }
});
