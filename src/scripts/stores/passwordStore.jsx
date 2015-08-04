var React = require('react'),
    Reflux = require('reflux'),
    request = require('superagent'),
    PasswordActions = require('../actions/passwordActions');

module.exports = Reflux.createStore({
  listenables: [PasswordActions],

  onResetPasswordRequest: function (resetParam) {
    request.post('http://localhost:3000/api/v1/passwords/send_reset_email')
           .send({email: resetParam.email})
           .end(function(err, res){
             if(res.ok){
               PasswordActions.resetPasswordRequest.completed(res.body)
             }else{
               PasswordActions.resetPasswordRequest.failed(res.body)
             }
           })
  },

  onChangePassowrdRequest: function(changeParams){
    request.post("http://localhost:3000/api/v1/passwords/" + changeParams.token + "/reset")
        .send({password: changeParams.password,
          password_confirmation: changeParams.passwordConfirmation
        })
        .end(function(err,res){
          if(res.ok) {
            PasswordActions.changePassowrdRequest.completed(res.body)
          }else{
            PasswordActions.changePassowrdRequest.failed(res.body)
          }
        })
  },

  onResetPasswordRequestCompleted: function(response){
    this.trigger({status: response.status, message: "Instructions have been sent."})
  },

  onResetPasswordRequestFailed: function(response){
    this.trigger({status: response.status, message: response.data.error_message})
  },

  onChangePasswordRequestCompleted: function(response){
    this.trigger({status: response.status})
  },

  onChangePasswordRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: response.data.error_message})
  }
});
