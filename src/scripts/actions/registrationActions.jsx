var Reflux = require('reflux');

var RegistrationActions = {
  fetchUserRequest: {asyncResult: true},
  updateUserRequest: {asyncResult: true},
  createUserRequest: {asyncResult: true},
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
