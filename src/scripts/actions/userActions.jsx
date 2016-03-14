var Reflux = require('reflux');

var UserActions = {
  fetchUsers: {asyncResult: true},
  fetchPatients: {asyncResult: true},
  signUpUser: {asyncResult: true},
  fetchStaffRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(UserActions);
