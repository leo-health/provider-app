var Reflux = require('refulx')
LoginActions = require('../actions/loginActions')


module.exports = Reflux.createStore({
  //init: function () {
  //  this.listenToMany(actions)
  //},

  listenalbes: loginActions,
});
