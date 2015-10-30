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
    }
    RegistrationActions.convertEnrollmentRequest(user_data, response.data.session.authentication_token);
    this.trigger({ action: "update",
                   status: response.status,
                   data: response.data });
  },

  onUpdateEnrollmentRequestFailed: function(response){
    this.trigger({ action: "update",
                   status: response.status,
                   message: "There was an error updating your enrollment information."});
  },

  onConvertEnrollmentRequest: function(user, token){
    request.post("http://localhost:3000/api/v1/users")
           .send({
              first_name: user.first_name,
              last_name: user.last_name,
              phone: user.phone,
              authentication_token: token
            })
           .end(function(err, res){
              if(res.ok){
                RegistrationActions.convertEnrollmentRequest.completed(res.body);
              }else{
                RegistrationActions.convertEnrollmentRequest.failed(res.body);
              }
            });
  },

  onConvertEnrollmentRequestCompleted: function(response){

    this.trigger({
                   action: "convert",
                   status: response.status,
                   data: response.data });
  },

  onConvertEnrollmentRequestFailed: function(response){
    this.trigger({ action: "convert",
                   status: response.status,
                   message: "There was an error processing your registration request."})
  }
});
