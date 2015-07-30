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
               debugger
               PasswordActions.resetPasswordRequest.failed(res.body)
             }
           })
  },

  onResetPasswordRequestCompleted: function (response) {
    debugger
    this.trigger(response.status)
  },

  onResetPasswordRequestFailed: function(response) {
    debugger
  },

  onChangePassowrdRequest: function(password){
    //post the password to api
  }
});
