var Reflux = require('reflux');

var LoginActions = {
  loginRequest:  {asyncResult: true, children: ['progressed']},
  logoutRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(LoginActions);
