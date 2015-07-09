var Reflux = require('reflux')

var LoginActions = {
  login:  {asyncResult: true, children: [ 'progressed' ]},
  logout: {asyncResult: true}
}

module.exports = Reflux.createActions(LoginActions)
