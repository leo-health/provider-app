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
      data: response.data
    });
  },

  onFetchEnrollmentRequestFailed: function(response){
    this.trigger({ action: "fetch",
                   status: response.status,
                   message: "There was an error retrieiving your enrollment information."});
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
      data: response.data
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
               this.trigger({message: "couldn't generate your vendor id"})
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
  }
});
