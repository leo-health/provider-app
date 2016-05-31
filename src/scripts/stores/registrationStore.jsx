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
      status: response.status,
      data: response.data,
      enrollment: response.data.user
    });
  },

  onFetchEnrollmentRequestFailed: function(response){
    this.trigger({ action: "fetch",
                   status: response.status,
                   message: "There was an error retrieving your enrollment information."});
  },

  onUpdateEnrollmentRequest: function(enrollmentParams, nextPage){
    request.put(leo.API_URL+"/enrollments/current")
           .send(enrollmentParams)
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.updateEnrollmentRequest.completed(res.body, nextPage);
              }else{
                RegistrationActions.updateEnrollmentRequest.failed(res.body);
              }
            });
  },

  onUpdateEnrollmentRequestCompleted: function(response, nextPage){
    this.trigger({
      action: "update",
      status: response.status,
      nextPage: nextPage,
      enrollment: response.data.user
    });
  },

  onUpdateEnrollmentRequestFailed: function(response){
    this.trigger({
      action: "update",
      status: response.status,
      message: "There was an error updating your enrollment information."
    });
  },

  onCreateEnrollmentRequest: function(enrollmentParams){
    request.get(leo.API_URL+"/ios_configuration")
           .end(function(err, res){
             if(res.ok){
               enrollmentParams["vendor_id"]= res.body.data.vendor_id;
               request.post(leo.API_URL+"/enrollments")
                      .send(enrollmentParams)
                      .end(function(err, res){
                        if(res.ok){
                          RegistrationActions.createEnrollmentRequest.completed(res.body, enrollmentParams.nextPage);
                        }else{
                          RegistrationActions.createEnrollmentRequest.failed(res.body);
                        }
                        })
             }else{
               this.trigger({status: 'error', errorMessage: "couldn't generate your vendor id"})
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
      message: response.message.error_message,
      nextPage: false
    })
  },

  onFetchInsurersRequest: function(){
    request.get(leo.API_URL+"/insurers")
           .end(function(err, res){
              if(res.ok) RegistrationActions.fetchInsurersRequest.completed(res.body)
            })
  },

  onFetchInsurersRequestCompleted: function(response){
    this.trigger(response.data)
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

  onCreatePatientEnrollmentRequest: function(patientEnrollmentParams){
    request.post(leo.API_URL+"/patient_enrollments")
           .send(patientEnrollmentParams)
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken);
              }else{
                RegistrationActions.createPatientEnrollmentRequest.failed(res.body)
              }
            })

  },

  onCreatePatientEnrollmentRequestFailed: function(res){
    this.trigger({
      error: res.data.message
    })
  },

  onRemovePatientEnrollmentRequest: function (params) {
    request.delete(leo.API_URL + "/patient_enrollments/" + params.id)
           .send(params)
           .end(function(err,res){
             if(res.ok){
               RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken)
             }else{
               RegistrationActions.removePatientEnrollmentRequest.failed(res.body)
             }
           })
  },

  onRemvoePaitnetEnrollmentRequestReqestFailed: function(res) {
    this.trigger({
      deletePatientEnrollment: false,
      errorMessage: res.data.message
    })
  },

  onUpdatePatientEnrollmentRequest: function(params){
    request.put(leo.API_URL + "/patient_enrollments/" + params.id)
           .send(params)
           .end(function(err,res){
              if(res.ok){
                RegistrationActions.fetchEnrollmentRequest(sessionStorage.enrollmentToken);
              }else{
                RegistrationActions.updateEnrollmentRequest.failed(res.body)
              }
            })
  },

  onUpdatePatientEnrollmentRequestFailed: function(res){
    this.trigger({
      updatePatientEnrollment: false,
      errorMessage: res.data.message
    })
  }
});
