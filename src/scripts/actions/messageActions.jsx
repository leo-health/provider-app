var Reflux = require('reflux');

var MessageActions = {
  fetchMessagesRequest: {asyncResult: true},
  fetchMessageRequest: {asyncResult: true},
  sendMessageRequest: {asyncResult: true},
  escalateMessageRequest: {asyncResult: true},
  emptyMessageList: {}
};

module.exports = Reflux.createActions(MessageActions);
