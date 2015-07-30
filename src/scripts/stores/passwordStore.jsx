var Reflux = require('reflux');
var PasswordActions = require('../actions/passwordActions');
var request = require('superagent');

module.exports = Reflux.createStore({
  listenables: [PasswordActions],

  onResetPasswordRequest: function (resetParam) {
    debugger
    request.post('http://localhost:3000/api/v1/passwords/send_reset_email')
           .send({email: resetParam.email})
           .end(function(err, res){
             if(res.ok){
               PasswordActions.resetPasswordRequest.completed(res.body)
             }else{
               PasswordActions.resetPasswordRequest.failed(err)
             }
           })
  },

  onresetPasswordRequestCompleted: function (response) {
    this.trigger(response.status)
  },

  onresetPasswordRequestFailed: function(error) {
    //do a error rendering
  },

  onChangePassowrdRequest: function(password){
    //post the password to api
  }
});
