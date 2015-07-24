var React = require('react');

var HomeHeader = require('./homeHeader');
var ConversationList = require('../modules/conversation/conversationList')

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <HomeHeader/>
        <ConversationList/>
      </div>
    )
  }
});
