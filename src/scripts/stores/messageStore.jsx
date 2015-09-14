var Reflux = require('reflux'),
    request = require('superagent'),
    MessageActions = require('../actions/messageActions');

module.exports = Reflux.createStore({
  listenables: [MessageActions],

  onFetchMessageRequest: function(authenticationToken, currentConversationId){
    request.get("http://leo-api.elasticbeanstalk.com/v1/conversations/"+ currentConversationId +"/messages")
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
                   messages: response.data.messages,
                   init: false})
  },

  onFetchMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching messages"})
  },

  onSendMessageRequest: function(authenticationToken, messageBody, typeName, currentConversationId){
    request.post("http://leo-api.elasticbeanstalk.com/api/v1/conversations/"+ currentConversationId +"/messages")
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
                   new_message: response.data})
  },

  onSendMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error sending messages"})
  }
});
