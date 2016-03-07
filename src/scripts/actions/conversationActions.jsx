var Reflux = require('reflux');

var ConversationActions = {
  fetchConversationsRequest: {asyncResult: true},
  fetchConversationByFamily: {asyncResult: true},
  fetchStaffConversation: {asyncResult: true},
  fetchConversationById: {ayncResult: true},
  closeConversationRequest: {asyncResult: true},
  escalateConversationRequest: {asyncResult: true},
  selectConversation: {}
};

module.exports = Reflux.createActions(ConversationActions);
