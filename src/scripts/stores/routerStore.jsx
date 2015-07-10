var Reflux = require('reflux');
var SessionStore = require('./sessionStore');
var RouterActions = require('../actions/routerActions');

module.exports = Reflux.createStore({
  listenables: [RouterActions],

  onSetRouter: function(router){
    this.router = router
  },

  onSessionChanged: function(result){
    if (result.isLoggedIn){
      this.router.transitionTo('home')
    } else{
      this.router.transitionTo('login')
    }
  }
});
