var Reflux = require('reflux'),
    request = require('superagent'),
    MessageActions = require('../actions/messageActions'),
    _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [MessageActions],

  onFetchMessagesRequest: function(authenticationToken, currentConversationId, page, offset){
    request.get(leo.API_URL+"/conversations/"+ currentConversationId +"/messages/full")
           .query({ authentication_token: authenticationToken,
                    page: page,
                    offset: offset
                   })
           .end(function(err, res){
             if(res.ok){
               MessageActions.fetchMessagesRequest.completed(res.body, page)
             }else{
               MessageActions.fetchMessagesRequest.failed(res.body)
             }
           });
  },

  onFetchMessagesRequestCompleted: function(response, page){
    var messages = response.data.messages.reverse();
    var response = {
      currentConversationId: response.data.conversation_id
    };

    page == 1 ? response.messages = messages : response.newBatchMessages = messages;
    this.trigger(response)
  },

  onFetchMessagesRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching messages"})
  },

  onFetchMessageRequest: function(authenticationToken, messageId){
    request.get(leo.API_URL+"/messages/"+ messageId)
      .query({ authentication_token: authenticationToken })
      .end(function(err, res){
          if(res.ok){
            MessageActions.fetchMessageRequest.completed(res.body)
          }else{
            MessageActions.fetchMessageRequest.failed(res.body)
          }
        })

  },

  onFetchMessageRequestCompleted: function(response){
    this.trigger({
      status: response.status,
      newMessage: response.data
    })
  },

  onFetchMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching message" })
  },

  onSendMessageRequest: function(authenticationToken, messageBody, typeName, currentConversationId){
    request.post(leo.API_URL+"/conversations/"+ currentConversationId +"/messages")
           .send({authentication_token: authenticationToken, body: messageBody, type_name: typeName})
           .end(function(err, res){
             if(res.ok){
               MessageActions.sendMessageRequest.completed(res.body)
             }else{
               MessageActions.sendMessageRequest.failed(res.body)
             }
           });
  },

  onSendMessageRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   newMessage: response.data})
  },

  onSendMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error sending messages"})
  },

  onEmptyMessageList: function() {
    this.trigger({
      messages: [],
      currentConversationId: undefined
    })
  }
});
