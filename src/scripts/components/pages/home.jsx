var React = require('react');

var HomeHeader = require('./homeHeader');
var ConversationList = require('../modules/conversation/conversationList');
var MessageList = require('../modules/message/messageList');
var FindConversation = require('../modules/search/findConversation');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div id="left" className="col-lg-4">
              <FindConversation/>
              <ConversationList/>
            </div>
            <div id="right" className="col-lg-8">
              <MessageList/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
