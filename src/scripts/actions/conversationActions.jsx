var Reflux = require('reflux');

var ConversationActions = {
  fetchConversationsRequest: {asyncResult: true},
  fetchConversationByFamily: {asyncResult: true},
  fetchStaffConversation: {asyncResult: true},
  fetchConversationById: {asyncResult: true},
  selectConversation: {}
};

module.exports = Reflux.createActions(ConversationActions);
