var Reflux = require('reflux');

var RegistrationActions = {
  fetchEnrollmentRequest: {asyncResult: true},
  updateEnrollmentRequest: {asyncResult: true},
  convertEnrollmentRequest: {asyncResult: true},
  createEnrollmentRequest: {asyncResult: true},
  fetchInsurersRequest: {asyncResult: true},
  createCreditCardRequest: {asyncResult: true},
  createPatientEnrollmentRequest: {asyncResult: true},
  removePatientEnrollmentRequest: {asyncResult: true},
  updatePatientEnrollmentRequest: {asyncResult: true},
  fetchPatientsRequest: {asyncResult: true},
  createSubscriptionRequest: {asyncResult: true},
  inviteSecondParentRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(RegistrationActions);
