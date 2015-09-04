var Reflux = require('reflux');

var MessageActions = {
  fetchMessageRequest: {asyncResult: true},
  sendMessageRequest: {asyncResult: true},
  escalateMessageRequest: {asyncResult: true},
  fetchStaffRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(MessageActions);
