var Reflux = require('reflux');

var MessageActions = {
  fetchMessageRequest: {asyncResult: true},
  sendMessageRequest: {ayncResult: true}
};

module.exports = Reflux.createActions(MessageActions);
