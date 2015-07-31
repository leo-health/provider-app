var Reflux = require('reflux');
var PasswordActions = require('../actions/passwordActions');
var request = require('superagent');

module.exports = Reflux.createStore({
  listenables: [PasswordActions],

  onResetPasswordRequest: function (resetParams) {
    request.post('http://localhost:3000/api/v1/passwords/send_reset_email')
           .send({email: resetParams.email})
           .end(function(err, res){
             if(res.ok){
               PasswordActions.resetPasswordRequest.completed(res.body)
             }else{
               PasswordActions.resetPasswordRequest.failed(res.body)
             }
           })
  },

  onResetPasswordRequestCompleted: function (response) {
    this.trigger({status: response.status,
                  message: "Instrunctions sent."})
  },

  onResetPasswordRequestFailed: function(response) {
    this.trigger({status: response.status,
                  message: response.data.error_message})
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
    this.trigger({status: response.status})
  },

  onResetPasswordRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: response.data.error_message})
  }
});
