var Reflux = require('reflux'),
    request = require('superagent'),
    PasswordActions = require('../actions/passwordActions');

module.exports = Reflux.createStore({
  listenables: [PasswordActions],

  onResetPasswordRequest: function(resetParam) {
    request.post(leo.API_URL+"/passwords/send_reset_email")
           .send({email: resetParam.email})
           .end(function(err, res){
             if(res.ok){
               PasswordActions.resetPasswordRequest.completed(res.body)
             }else{
               PasswordActions.resetPasswordRequest.failed(res.body)
             }
           })
  },

  onChangePasswordRequest: function(changeParam){
    request.put(leo.API_URL+"/passwords/" + changeParam.token + "/reset")
        .send({password: changeParam.password,
               password_confirmation: changeParam.passwordConfirmation
        })
        .end(function(err,res){
          if(res.ok) {
            PasswordActions.changePasswordRequest.completed(res.body)
          }else{
            PasswordActions.changePasswordRequest.failed(res.body)
          }
        })
  },

  onResetPasswordRequestCompleted: function(response){
    this.trigger({status: response.status,
                  message: "Instructions have been sent.",
                  button: "Back"})
  },

  onResetPasswordRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: response.message.error_message,
                  button: "Try again"})
  },

  onChangePasswordRequestCompleted: function(response){
    this.trigger({status: response.status,
                  message: "Password changed successfully.",
                  button: "Submit"})
  },

  onChangePasswordRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: response.message.error_message,
                  button: "Submit"})
  }
});
