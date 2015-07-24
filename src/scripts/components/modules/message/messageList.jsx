var React = require('react');
var Message = require('./message');
var MessageHeader = require('./messageHeader');
var MessageForm = require('./messageForm');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <MessageHeader/>
        <div id="conversation-container" className="pre-scrollable panel panel-body">
          <Message/>
        </div>
        <MessageForm/>
      </div>
    )
  }
});
