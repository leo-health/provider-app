var Reflux = require('reflux');

var PracticeActions = {
  fetchPracticeRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(PracticeActions);
