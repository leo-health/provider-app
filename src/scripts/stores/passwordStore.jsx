var Reflux = require('reflux');
var PasswordActions = require('../actions/passwordActions');
var request = require('superagent');

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

  onResetPasswordRequestCompleted: function (response) {
    this.trigger({status: response.status,
                  message: "Instrunctions sent."})
  },

  onResetPasswordRequestFailed: function(response) {
    this.trigger({status: response.status,
                  message: response.data.error_message})
  },

  onChangePassowrdRequest: function(password){
    //post the password to api
  }
});
