var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions'),
    MessageActions = require('../actions/messageActions'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationRequest: function(authenticationToken, status){
    if (status.length > 0){
      var conversationParams = {authentication_token: authenticationToken, status: status}
    }else{
      conversationParams = {authentication_token: authenticationToken}
    }
    request.get('https://dev.leoforkids.com/api/v1/conversations')
           .query(conversationParams)
           .end(function(err, res){
              if(res.ok){
                ConversationActions.fetchConversationRequest.completed(res.body, status)
              }else{
                ConversationActions.fetchConversationRequest.failed(res.body)
              }
            })
  },

  onFetchConversationRequestCompleted: function(response, status){
    var conversations = response.data.conversations;
    if (conversations.length > 0){
      var firstConversationId = response.data.conversations[0].id;
      MessageActions.fetchMessagesRequest(localStorage.authenticationToken, firstConversationId);
      NoteActions.fetchNoteRequest(localStorage.authenticationToken, firstConversationId) ;
    }
    this.trigger({ status: response.status,
                   conversations: conversations,
                   init: true,
                   conversationStatus: status
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
    request.put('https://dev.leoforkids.com/api/v1/conversations/' + conversationId)
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
  }
});
