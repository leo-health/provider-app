var React = require('react');
var Message = require('./message');
var MessageHeader = require('./messageHeader');

module.exports = React.createClass({
  render: function () {
    return (
      <div id="conversation-container" className="pre-scrollable panel panel-body">
        <MessageHeader/>
        <Message/>
      </div>
    )
  }
});
