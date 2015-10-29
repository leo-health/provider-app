var Reflux = require('reflux'),
    request = require('superagent'),
    RegistrationActions = require('../actions/registrationActions');

module.exports = Reflux.createStore({
  listenables: [RegistrationActions],


  onFetchEnrollmentRequest: function(token){
    request.get("http://localhost:3000/api/v1/enrollments/current")
           .query({ authentication_token: token })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.fetchEnrollmentRequest.completed(res.body)
              }else{
                RegistrationActions.fetchEnrollmentRequest.failed(res.body)
              }
            });
  },

  onFetchEnrollmentRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   data: response.data })
  },

  onFetchEnrollmentRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "There was an error retrieiving your enrollment information."})
  },

  onUpdateEnrollmentRequest: function(enrollmentParams, token){
    debugger
    request.put("http://localhost:3000/api/v1/enrollments/current")
           .send({
              authentication_token: token,
              first_name: enrollmentParams.firstname,
              last_name: enrollmentParams.lastname,
              email: enrollmentParams.email,
              phone: enrollmentParams.phone,
              password: enrollmentParams.password
            })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.fetchEnrollmentRequest.completed(res.body)
              }else{
                RegistrationActions.fetchEnrollmentRequest.failed(res.body)
              }
            });
  },

  onUpdateEnrollmentRequestCompleted: function(response){
    this.trigger({ status: response.status,
                   data: response.data })
    debugger
    RegistrationActions.convertEnrollmentRequest(response.data.authentication_token);
  },

  onUpdateEnrollmentRequestFailed: function(response){
    this.trigger({ status: response.status,
                   message: "There was an error retrieiving your enrollment information."})
  },

  onConvertEnrollmentRequest: function(token){
    request.post("http://localhost:3000/api/v1/users")
           .send({
              authentication_token: token
            })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.convertEnrollmentRequest.completed(res.body)
              }else{
                RegistrationActions.convertEnrollmentRequest.failed(res.body)
              }
            });
  },

  onConvertEnrollmentRequestCompleted: function(response){
    debugger
    this.trigger({ status: response.status,
                   data: response.data })
  },

  onConvertEnrollmentRequestFailed: function(response){
    debugger
    this.trigger({ status: response.status,
                   message: "There was an error processing your registration request."})
  }
});
