var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions'),
    MessageActions = require('../actions/messageActions'),
    _firstConversationId = null;

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  //init: function(){
  //  debugger
  //  request.get('http://localhost:3000/api/v1/conversations')
  //      .query({authentication_token: localStorage.authenticationToken, status: 'open'})
  //      .end(function(err, res){
  //        if(res.ok){
  //          _firstConversationId = res.body.data.conversations[0].id
  //          MessageActions.fetchMessageRequest(localStorage.authenticationToken, _firstConversationId)
  //          ConversationActions.fetchConversationRequest.completed(res.body)
  //        }else{
  //          ConversationActions.fetchConversationRequest.failed(res.body)
  //        }
  //      })
  //},

  getFirstConversationId: function(){
    return _firstConversationId
  },

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
                   conversations: response.data.conversations });
  },

  onFetchConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching conversations"})
  },

  onSendMessages: function(messages, index, conversationId){
    this.trigger({
      messages: messages,
      selectedConversation: index,
      conversationId: conversationId
    })
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
