var React = require('react');
var MessageList = require('./message/messageList');
var NoteList = require('./note/noteList');
var _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="col-lg-9">
          <MessageList pusher={this.pusher}/>
        </div>
        <div className="col-lg-3">
          <NoteList pusher={this.pusher}/>
        </div>
      </div>
    )
  }
});
