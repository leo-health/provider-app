var Reflux = require('reflux');

var LoginActions = {
  loginRequest:  {asyncResult: true},
  logoutRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(LoginActions);
