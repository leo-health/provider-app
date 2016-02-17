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
    this.subscribeToPusher();
  },

  componentWillUnmount: function () {
    this.unsubscribeFromPusher();
  },

  subscribeToPusher: function(){
    this.pusher = new Pusher(leo.PUSHER_APPLICATION_KEY, {
      encrypted: true,
      authEndpoint: leo.API_URL+"/pusher/auth",
      auth: {
        params: { authentication_token: sessionStorage.authenticationToken }
      }
    });

    var id = this.getUserId();
    this.pusher.subscribe('presence-provider_app');
    this.channel = this.pusher.subscribe('private-' + id);
  },

  unsubscribeFromPusher: function(){
    var id = this.getUserId();
    this.pusher.unsubscribe('presence-provider_app');
    this.pusher.unsubscribe('private-' + id);
  },

  getUserId: function(){
    if (sessionStorage.user) return JSON.parse(sessionStorage.user).id;
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
              <ConversationList channel={this.channel}/>
            </div>
            <div id="middle" className="col-lg-6">
              <MessageList channel={this.channel}/>
            </div>
            <div id="right" className="col-lg-3">
              <NoteList channel={this.channel}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
});
