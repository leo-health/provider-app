var Reflux = require('reflux');

var MessageActions = {
  fetchMessageRequest: {asyncResult: true},
  sendMessageRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(MessageActions);
