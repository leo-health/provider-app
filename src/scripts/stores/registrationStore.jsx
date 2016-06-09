var Reflux = require('reflux'),
    request = require('superagent'),
    RegistrationActions = require('../actions/registrationActions');

module.exports = Reflux.createStore({
  listenables: [RegistrationActions],

  onFetchEnrollmentRequest: function(token){
    request.get(leo.API_URL+"/enrollments/current")
           .query({ authentication_token: token })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.fetchEnrollmentRequest.completed(res.body);
              }else{
                RegistrationActions.fetchEnrollmentRequest.failed(res.body);
              }
            });
  },

  onFetchEnrollmentRequestCompleted: function(response){
    this.trigger({
      action: "fetch",
      enrollment: response.data.user
    });
  },

  onFetchEnrollmentRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "There was an error retrieving your enrollment information."
    });
  },

  onUpdateEnrollmentRequest: function(enrollmentParams){
    request.put(leo.API_URL+"/enrollments/current")
           .send(enrollmentParams)
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.updateEnrollmentRequest.completed(res.body);
              }else{
                RegistrationActions.updateEnrollmentRequest.failed(res.body);
              }
            });
  },

  onUpdateEnrollmentRequestCompleted: function(response, nextPage){
    this.trigger({
      action: "update",
      enrollment: response.data.user
    });
  },

  onUpdateEnrollmentRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "There was an error updating your enrollment information."
    });
  },

  onCreateEnrollmentRequest: function(userParams){
    request.get(leo.API_URL+"/ios_configuration")
           .end(function(err, res){
             if(res.ok){
               userParams["vendor_id"]= res.body.data.vendor_id;
               request.post(leo.API_URL+"/users")
                      .send(userParams)
                      .end(function(err, res){
                        if(res.ok){
                          RegistrationActions.createEnrollmentRequest.completed(res.body, userParams.next_page);
                        }else{
                          RegistrationActions.createEnrollmentRequest.failed(res.body);
                        }
                      })
             }else{
               this.trigger({status: 'error', errorMessage: "Server error, our engineers are working on it."})
             }
           });
  },

  onCreateEnrollmentRequestCompleted: function(response, nextPage){
    this.trigger({
      enrollmentToken: response.data.session.authentication_token,
      nextPage: nextPage
    })
  },

  onCreateEnrollmentRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: response.message.user_message || "Server error, our engineers are working on it.",
      nextPage: false
    })
  },

  onCreateCreditCardRequest: function(params, nextPage){
    Stripe.card.createToken(params, function (status, response) {
      if(status === 200){
        RegistrationActions.createCreditCardRequest.completed(response, nextPage)
      }else{
        RegistrationActions.createCreditCardRequest.failed(response)
      }
    })
  },

  onCreateCreditCardRequestCompleted: function(res, nextPage){
    this.trigger({
      nextPage: nextPage,
      creditCardToken: res.id,
      creditCardBrand: res.card.brand,
      last4: res.card.last4
    })
  },

  onCreateCreditCardRequestFailed: function(res){
    this.trigger({
      status: "error",
      message: res.error.message
    })
  },

  onCreatePatientEnrollmentRequest: function(patientParams){
    request.post(leo.API_URL+"/patients")
           .send(patientParams)
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.createPatientEnrollmentRequest.completed(res.body)
              }else{
                RegistrationActions.createPatientEnrollmentRequest.failed(res.body)
              }
            })

  },

  onCreatePatientEnrollmentRequestCompleted: function(res){
    this.trigger({ patient: res.data.patient })
  },

  onCreatePatientEnrollmentRequestFailed: function(res){
    this.trigger({ error: res.data.message })
  },

  onRemovePatientEnrollmentRequest: function (params) {
    request.delete(leo.API_URL + "/patients/" + params.id)
           .send(params)
           .end(function(err,res){
             if(res.ok){
               RegistrationActions.removePatientEnrollmentRequest.completed(params)
             }else{
               RegistrationActions.removePatientEnrollmentRequest.failed(res.body)
             }
           })
  },

  onRemovePatientEnrollmentRequestCompleted: function(params) {
    this.trigger({ deletedPatient: {id: params.id}})
  },

  onRemovePatientEnrollmentRequestFailed: function(res) {
    this.trigger({
      status: "error", message: res.error.message
    })
  },

  onUpdatePatientEnrollmentRequest: function(params){
    request.put(leo.API_URL + "/patients/" + params.id)
           .send(params)
           .end(function(err,res){
              if(res.ok){
                RegistrationActions.updatePatientEnrollmentRequest.completed(res.body);
              }else{
                RegistrationActions.updatePatientEnrollmentRequest.failed(res.body)
              }
            })
  },

  onUpdatePatientEnrollmentRequestCompleted: function(res) {
    this.trigger({ updatedPatient: res.data.patient })
  },

  onUpdatePatientEnrollmentRequestFailed: function(res){
    this.trigger({ status: "error", message: res.error.message })
  },

  onFetchPatientsRequest: function(params){
    request.get(leo.API_URL + "/patients")
           .query({ authentication_token: params })
           .end(function(err, res){
             if(res.ok){
               RegistrationActions.fetchPatientsRequest.completed(res.body);
             }else{
               RegistrationActions.fetchPatientsRequest.failed(res.body);
             }
           })
  },

  onFetchPatientsRequestCompleted: function(res){
    this.trigger({ patients: res.data.patients })
  },

  onFetchPatientsRequestFailed: function(res){
    this.trigger({ status: "error", message: res.error.message })
  },

  onCreateSubscriptionRequest: function(params){
    request.post(leo.API_URL + "/subscriptions")
           .send(params)
           .end(function(err,res){
             if(res.ok){
               RegistrationActions.createSubscriptionRequest.completed(res.body);
             }else{
               RegistrationActions.createSubscriptionRequest.failed(res.body)
             }
           })
  },

  onCreateSubscriptionRequestCompleted: function(res){
    this.trigger({ createdSubscription: true })
  },

  onCreateSubscriptionRequestFailed: function(res){
    this.trigger({ status: "error", message: res.message.user_message })
  },

  onInviteSecondParentRequest: function(params){
    request.post(leo.API_URL + "/family/invite")
        .send(params)
        .end(function(err,res){
          if(res.ok){
            RegistrationActions.inviteSecondParentRequest.completed(res.body);
          }else{
            RegistrationActions.inviteSecondParentRequest.failed(res.body)
          }
        })
  },

  onInviteSecondParentRequestCompleted: function(res){
    this.trigger({ inviteSuccess: true })
  },

  onInviteSecondParentRequestFailed: function(res){
    this.trigger({ status: "error", message: res.message.user_message })
  }
});
