var Reflux = require('reflux');

var PasswordActions = {
  resetPasswordRequest: {asyncResult: true},
  changePasswordRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(PasswordActions);
