var Reflux = require('reflux'),
    request = require('superagent'),
    MessageActions = require('../actions/messageActions');

module.exports = Reflux.createStore({
  listenables: [MessageActions],

  onFetchStaffRequest: function(authenticationToken){
    request.get('http://localhost:3000/api/v1/staff')
        .query({authentication_token: authenticationToken})
        .end(function(err, res){
          if(res.ok){
            MessageActions.fetchStaffRequest.completed(res.body)
          }else{
            MessageActions.fetchStaffRequest.failed(res.body)
          }
        })
  },

  onFetchStaffRequestCompleted: function(response){
    this.trigger({status: response.status,
                  staff: response.data.staff})
  },

  onFetchStaffRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching staff"})
  },

  onFetchMessagesRequest: function(authenticationToken, currentConversationId){
    request.get("http://localhost:3000/api/v1/conversations/"+ currentConversationId +"/messages/full")
        .query({ authentication_token: authenticationToken })
        .end(function(err, res){
          if(res.ok){
            MessageActions.fetchMessagesRequest.completed(res.body)
          }else{
            MessageActions.fetchMessagesRequest.failed(res.body)
          }
        });
  },

  onFetchMessagesRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   messages: response.data.messages.reverse(),
                   currentConversationId: response.data.conversation_id })
  },

  onFetchMessagesRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "error fetching messages"})
  },

  onFetchMessageRequest: function(authenticationToken, messageId){
    request.get("http://localhost:3000/api/v1/messages/"+ messageId)
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
    this.trigger({ status: response.status,
                   new_message: response.data })
  },

  onFetchMessageRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: 'error fetching message' })
  },

  onSendMessageRequest: function(authenticationToken, messageBody, typeName, currentConversationId){
    request.post("http://localhost:3000/api/v1/conversations/"+ currentConversationId +"/messages")
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
  },

  onScrollToNote: function(identity){
    this.trigger({identity: identity})
  },

  onNotifyNoneMessage: function(){
    this.trigger({messages: []})
  }
});
