var Reflux = require('reflux');

var UserActions = {
  fetchUsers: {asyncResult: true},
  fetchPatients: {asyncResult: true},
  confirmInvitedGuardian: {asyncResult: true},
  fetchStaffRequest: {asyncResult: true},
  fetchIndividualUserRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(UserActions);
