var Reflux = require('reflux');

var UserActions = {
  fetchGuardians: {asyncResult: true},
  fetchPatients: {asyncResult: true}
};

module.exports = Reflux.createActions(UserActions);
