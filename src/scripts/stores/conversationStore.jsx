var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  //getInitialState: function () {
  //  var conversations = ConversationStore.getDefaultData();
  //  return {conversations: conversations}
  //},
  //
  //init: function(){
  //  debugger
  //  ConversationActions.fetchConversationRequest(localStorage.authentication_token);
  //},

  onFetchConversationRequest: function( authentication_token ){
    request.get('http://localhost:3000/api/v1/conversations')
           .query({ authentication_token: authentication_token })
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
                  message: "error fetching conversations"
                  })
  },

  getDefaultData(){
    return data;
  }
});
