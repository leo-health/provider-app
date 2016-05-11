var Reflux = require('reflux');

var RegistrationActions = {
  fetchEnrollmentRequest: {asyncResult: true},
  updateEnrollmentRequest: {asyncResult: true},
  convertEnrollmentRequest: {asyncResult: true},
  createEnrollmentRequest: {asyncResult: true},
  fetchInsurersRequest: {asyncResult: true},
  createCreditCardRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(RegistrationActions);
