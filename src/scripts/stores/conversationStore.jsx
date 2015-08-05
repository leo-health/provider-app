var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationRequest: function(conversationParam){
  },

  onFetchConversationRequestCompleted: function(response){

  },

  onFetchConversationRequestFailed: function(response){

  }

});
