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
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.stateChanel = this.pusher.subscribe('newState' + localStorage.email);
    this.messageChanel = this.pusher.subscribe('newMessage' + localStorage.email);
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
              <ConversationList stateChanel={this.stateChanel}/>
            </div>
            <div id="middle" className="col-lg-6">
              <MessageList messageChanel={this.messageChanel} stateChanel={this.stateChanel}/>
            </div>
            <div id="right" className="col-lg-3">
              <NoteList stateChanel={this.stateChanel}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
});
