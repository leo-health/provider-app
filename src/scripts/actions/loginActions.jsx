var Reflux = require('reflux');

var LoginActions = {
  loginRequest:  {asyncResult: true, children: ["completed", "failed"]},
  logoutRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(LoginActions);
