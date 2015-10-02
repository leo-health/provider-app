var Reflux = require('reflux'),
    request = require('superagent'),
    MessageActions = require('../actions/messageActions');

module.exports = Reflux.createStore({
  listenables: [MessageActions],

  onFetchMessageRequest: function(authenticationToken, currentConversationId){
    request.get("http://localhost:3000/api/v1/conversations/"+ currentConversationId +"/messages")
           .query({ authentication_token: authenticationToken })
           .end(function(err, res){
              if(res.ok){
                MessageActions.fetchMessageRequest.completed(res.body)
              }else{
                MessageActions.fetchMessageRequest.failed(res.body)
              }
            });
  },

  onFetchMessageRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   messages: response.data.messages })
  },

  onFetchMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching messages"})
  },

  onSendMessageRequest: function(authenticationToken, messageBody, messageType, currentConversationId){
    request.post("http://localhost:3000/api/v1/conversations/"+ currentConversationId +"/messages")
           .send({authentication_token: authenticationToken, body: messageBody, message_type: messageType})
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
                   new_message: response.data})
  },

  onSendMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error sending messages"})
  }
});
