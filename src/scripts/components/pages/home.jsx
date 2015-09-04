var React = require('react');

var HomeHeader = require('./homeHeader');
var ConversationList = require('../modules/conversation/conversationList');
var MessageList = require('../modules/message/messageList');
var FindConversation = require('../modules/search/findConversation');

module.exports = React.createClass({
  componentWillMount: function(){
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.statusChanel = this.pusher.subscribe('newStatus' + localStorage.email);
    this.messageChanel = this.pusher.subscribe('newMessage' + localStorage.email);
  },

  render: function() {
    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div id="left" className="col-lg-4">
              <FindConversation/>
              <ConversationList statusChanel={this.statusChanel}/>
            </div>
            <div id="right" className="col-lg-8">
              <MessageList messageChanel={this.messageChanel}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
