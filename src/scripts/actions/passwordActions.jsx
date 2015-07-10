var Reflux = require('reflux');

var PasswordActions = {
  reset: {asyncResult: true},
  change: {ayncResult: true}
};

module.exports = Reflux.createActions(PasswordActions);
