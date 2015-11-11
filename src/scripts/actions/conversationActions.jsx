var Reflux = require('reflux');

var ConversationActions = {
  fetchConversationRequest: {asyncResult: true},
  fetchConversationByFamily: {asyncResult: true},
  fetchStaffConversation: {asyncResult: true},
  closeConversationRequest: {asyncResult: true},
  escalateConversationRequest: {asyncResult: true},
  selectConversation: {}
};

module.exports = Reflux.createActions(ConversationActions);
