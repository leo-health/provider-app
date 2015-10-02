var Reflux = require('reflux');
var SessionStore = require('./sessionStore');
var RouterActions = require('../actions/routerActions');

module.exports = Reflux.createStore({
  listenables: [RouterActions],

  onSetRouter: function(router){
    this.router = router
  }
});
