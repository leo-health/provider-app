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
  }

  //init: function(){
  //  debugger
  //  this.listenTo(ConversationStore, this.fetchMessages)
  //},
  //
  //getInitialState: function(){
  //  debugger
  //  return this.defaultMessages
  //},
  //
  //fetchMessages: function (result) {
  //  debugger
  //  this.defaultMessages = result.conversations[0].messages
  //},
  //
  //onDisplayMessages: function( messages ){
  //  this.trigger({messages: messages})
  //}
});
