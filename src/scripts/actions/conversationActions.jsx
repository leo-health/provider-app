var Reflux = require('reflux');

var ConversationActions = {
  fetchConversationRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(ConversationActions);
