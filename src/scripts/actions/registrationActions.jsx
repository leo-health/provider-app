var Reflux = require('reflux');

var RegistrationActions = {
  fetchEnrollmentRequest: {asyncResult: true},
  updateEnrollmentRequest: {asyncResult: true},
  convertEnrollmentRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(RegistrationActions);
