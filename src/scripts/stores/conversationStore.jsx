var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationRequest: function(authenticationToken, status){
    if (status.length > 0){
      var conversationParams = {authentication_token: authenticationToken, status: status}
    }else{
      conversationParams = {authentication_token: authenticationToken}
    }
    request.get('http://localhost:3000/api/v1/conversations')
           .query(conversationParams)
           .end(function(err, res){
              if(res.ok){
                ConversationActions.fetchConversationRequest.completed(res.body)
              }else{
                ConversationActions.fetchConversationRequest.failed(res.body)
              }
            })
  },

  onFetchConversationRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   conversations: response.data.conversations })
  },

  onFetchConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching conversations"})
  },

  onSelectConversation: function(selectedConversation){
    this.trigger({selectedConversation: selectedConversation})
  },

  onCloseConversationRequest: function(authenticationToken, conversationId){
    request.put('http://localhost:3000/api/v1/conversations/' + conversationId)
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
