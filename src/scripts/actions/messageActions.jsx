var Reflux = require('reflux');

var MessageActions = {
    fetchMessageRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(MessageActions);
