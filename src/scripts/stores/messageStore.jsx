var Reflux = require('reflux'),
    request = require('superagent'),
    MessageActions = require('../actions/messageActions');

module.exports = Reflux.createStore({
  listenables: [MessageActions],

  onDisplayMessages: function( messages ){
    debugger
    this.trigger({messages: messages})
  }
});
