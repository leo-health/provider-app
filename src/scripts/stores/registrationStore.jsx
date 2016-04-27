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

    this.trigger({ action: "fetch",
                   status: response.status,
                   data: response.data });
  },

  onFetchEnrollmentRequestFailed: function(response){
    this.trigger({ action: "fetch",
                   status: response.status,
                   message: "There was an error retrieiving your enrollment information."});
  },

  onUpdateEnrollmentRequest: function(enrollmentParams, token){
    request.put(leo.API_URL+"/enrollments/current")
           .send({
              authentication_token: token,
              first_name: enrollmentParams.firstName,
              last_name: enrollmentParams.lastName,
              email: enrollmentParams.email,
              phone: enrollmentParams.phone,
              password: enrollmentParams.password
            })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.updateEnrollmentRequest.completed(res.body);
              }else{
                RegistrationActions.updateEnrollmentRequest.failed(res.body);
              }
            });
  },

  onUpdateEnrollmentRequestCompleted: function(response){
    var user_data = {
      first_name: response.data.user.first_name,
      last_name: response.data.user.last_name,
      phone: response.data.user.phone
    };

    this.trigger({ action: "update",
                   status: response.status,
                   data: response.data });
  },

  onUpdateEnrollmentRequestFailed: function(response){
    this.trigger({ action: "update",
                   status: response.status,
                   message: "There was an error updating your enrollment information."});
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
                          RegistrationActions.createEnrollmentRequest.completed(res.body);
                        }else{
                          RegistrationActions.createEnrollmentRequest.failed(res.body);
                        }
                   })
             }else{
               this.trigger({message: "couldn't generate your vendor id"})
             }
           });
  },

  onCreateEnrollmentRequestCompleted: function(response){
    this.trigger({
      nextPage: "userInfo"
    })
  },

  onCreateEnrollmentRequestFailed: function(response){
    this.trigger({

    })
  }
});
