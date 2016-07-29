var Reflux = require('reflux');

var RegistrationActions = {
  fetchUserRequest: {asyncResult: true},
  updateUserRequest: {asyncResult: true},
  createUserRequest: {asyncResult: true},
  fetchInsurersRequest: {asyncResult: true},
  createCreditCardRequest: {asyncResult: true},
  createPatientRequest: {asyncResult: true},
  removePatientRequest: {asyncResult: true},
  updatePatientRequest: {asyncResult: true},
  fetchPatientsRequest: {asyncResult: true},
  createSubscriptionRequest: {asyncResult: true},
  inviteSecondParentRequest: {asyncResult: true},
  convertInvitedOrExemptedRequest: {asyncResult: true},
  validatePromoCodeRequest: {asyncResult: true}
};

module.exports = Reflux.createActions(RegistrationActions);
