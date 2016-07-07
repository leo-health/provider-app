var Reflux = require('reflux'),
    request = require('superagent'),
    RegistrationActions = require('../actions/registrationActions');

module.exports = Reflux.createStore({
  listenables: [RegistrationActions],

  onFetchUserRequest: function(token){
    request.get(leo.API_URL+"/users")
           .query({ authentication_token: token })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.fetchUserRequest.completed(res.body);
              }else{
                RegistrationActions.fetchUserRequest.failed(res.body);
              }
            });
  },

  onFetchUserRequestCompleted: function(res){
    this.trigger({
      action: "fetch",
      status: res.status,
      user: res.data.user
    });
  },

  onFetchUserRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "There was an error retrieving your information."
    });
  },

  onUpdateUserRequest: function(enrollmentParams){
    request.put(leo.API_URL+"/users/current")
           .send(enrollmentParams)
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.updateUserRequest.completed(res.body);
              }else{
                RegistrationActions.updateUserRequest.failed(res.body);
              }
            });
  },

  onUpdateUserRequestCompleted: function(res, nextPage){
    this.trigger({
      action: "update",
      status: res.status,
      user: res.data.user,
      session: res.data.session
    });
  },

  onUpdateUserRequestFailed: function(res){
    this.trigger({
      status: res.status,
      message: "There was an error updating your information."
    });
  },

  onCreateUserRequest: function(userParams){
    request.get(leo.API_URL+"/ios_configuration")
           .end(function(err, res){
             if(res.ok){
               userParams["vendor_id"]= res.body.data.vendor_id;
               request.post(leo.API_URL+"/users")
                      .send(userParams)
                      .end(function(err, res){
                        if(res.ok){
                          RegistrationActions.createUserRequest.completed(res.body, userParams.next_page);
                        }else{
                          RegistrationActions.createUserRequest.failed(res.body);
                        }
                      })
             }else{
               this.trigger({status: 'error', errorMessage: "Server error, our engineers are working on it."})
             }
           });
  },

  onCreateUserRequestCompleted: function(res, nextPage){
    this.trigger({
      status: res.status,
      authenticationToken: res.data.session.authentication_token,
      nextPage: nextPage
    })
  },

  onCreateUserRequestFailed: function(res){
    this.trigger({
      status: res.status,
      message: res.message.user_message || "Server error, our engineers are working on it.",
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
      status: res.status,
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

  onCreatePatientRequest: function(patientParams){
    request.post(leo.API_URL+"/patients")
           .send(patientParams)
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.createPatientRequest.completed(res.body)
              }else{
                RegistrationActions.createPatientRequest.failed(res.body)
              }
            })

  },

  onCreatePatientRequestCompleted: function(res){
    this.trigger({ status: res.status, patient: res.data.patient })
  },

  onCreatePatientRequestFailed: function(res){
    this.trigger({ error: 'Having problem creating records, please try again!'  })
  },

  onRemovePatientRequest: function (params) {
    request.delete(leo.API_URL + "/patients/" + params.id)
           .send(params)
           .end(function(err,res){
             if(res.ok){
               RegistrationActions.removePatientRequest.completed(res, params)
             }else{
               RegistrationActions.removePatientRequest.failed(res.body)
             }
           })
  },

  onRemovePatientRequestCompleted: function(res, params) {
    this.trigger({ status: res.status, deletedPatient: {id: params.id}})
  },

  onRemovePatientRequestFailed: function(res) {
    this.trigger({
      status: "error", message: 'Having problem removing records, please try again!'
    })
  },

  onUpdatePatientRequest: function(params){
    request.put(leo.API_URL + "/patients/" + params.id)
           .send(params)
           .end(function(err,res){
              if(res.ok){
                RegistrationActions.updatePatientRequest.completed(res.body);
              }else{
                RegistrationActions.updatePatientRequest.failed(res.body)
              }
            })
  },

  onUpdatePatientRequestCompleted: function(res) {
    this.trigger({ updatedPatient: res.data.patient })
  },

  onUpdatePatientRequestFailed: function(res){
    this.trigger({ status: "error", message: 'Having problem updating records, please try again!'  })
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
    this.trigger({ status: res.status, patients: res.data.patients })
  },

  onFetchPatientsRequestFailed: function(res){
    this.trigger({ status: "error", message: 'Having problem fetching records, please try again!' })
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
    this.trigger({ status: res.status, createdSubscription: true, quantity: res.data.subscriptions.data[0].quantity })
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
    this.trigger({ status: res.status, inviteSuccess: true })
  },

  onInviteSecondParentRequestFailed: function(res){
    this.trigger({ status: "error", message: res.message.user_message })
  }
});
