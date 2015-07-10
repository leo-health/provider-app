var Reflux = require('reflux');
var SessionStore = require('./sessionStore');
var RouterActions = require('../actions/RouterActions');

module.exports = Reflux.createStore({
  listenables: [RouterActions],

  onSetRouter: function(router){
    @router = router
  },

  onSessionChanged: function(result){
    if (result.isLoggedIn){
      @router.transitionTo('home')
    } else{
      @router.transitionTo('login')
    }
  }
});
