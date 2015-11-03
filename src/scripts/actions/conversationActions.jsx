var Reflux = require('reflux');

var ConversationActions = {
  fetchConversationRequest: {asyncResult: true},
  closeConversationRequest: {asyncResult: true},
  escalateConversationRequest: {asyncResult: true},
  selectConversation: {}
};

module.exports = Reflux.createActions(ConversationActions);
