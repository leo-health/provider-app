var React = require('react');
var HomeHeader = require('./homeHeader');
var FindFamily = require('../modules/search/findFamily');
var ConversationList = require('../modules/conversation/conversationList');
var ConversationHeader = require('../modules/conversation/conversationHeader');
var MessageList = require('../modules/message/messageList');
var NoteList = require('../modules/note/noteList');
var Footer = require('./footer');
var _ = require('lodash');

module.exports = React.createClass({
  componentWillMount: function(){
    this.pusher = new Pusher(leo.PUSHER_APPLICATION_KEY, {encrypted: true});
    if (localStorage.user) var email = JSON.parse(localStorage.user).email;
    this.stateChannel = this.pusher.subscribe('newState' + email);
    this.messageChannel = this.pusher.subscribe('newMessage' + email);
  },

  render: function() {
    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-3">
              <FindFamily/>
              <ConversationHeader/>
            </div>
          </div>
          <div className="row">
            <div id="left" className="col-lg-3">
              <ConversationList stateChannel={this.stateChannel}/>
            </div>
            <div id="middle" className="col-lg-6">
              <MessageList messageChannel={this.messageChannel} stateChannel={this.stateChannel}/>
            </div>
            <div id="right" className="col-lg-3">
              <NoteList stateChannel={this.stateChannel}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
});
