var Reflux = require('reflux');
PasswordActions = require('../actions/PasswordActions');

module.exports = Reflux.createStore({
  listenables: [PasswordActions],

  onRest: function (email) {
    //send the post request to api here
  },

  onResetCompleted: function (result) {
    //do a redirect
  },

  onRestFailed: function(response, error) {
    //do a error rendering
  },

  onChange: function(password){
    //post the password to api
  }
});
