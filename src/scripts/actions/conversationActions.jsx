var Reflux = require('reflux');

var ConversationActions = {
  fetchConversationRequest: {asyncResult: true},
  closeConversationRequest: {asyncResult: true},
  sendMessages: {}
};

module.exports = Reflux.createActions(ConversationActions);
