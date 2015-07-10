var Reflux = require('reflux');

var PasswordActions = {
  resetPasswordRequest: {asyncResult: true},
  changePassowrdRequest: {ayncResult: true}
};

module.exports = Reflux.createActions(PasswordActions);
