var React = require('react');
var Reflux = require('reflux');
var HomeHeader = require('./homeHeader');
var ConversationActions = require('../../actions/conversationActions');
var ConversationStore = require('../../stores/conversationStore');
var FindConversation = require('../modules/search/findConversation');
var ConversationList = require('../modules/conversation/conversationList');
var ConversationHeader = require('../modules/conversation/conversationHeader');
var MessageList = require('../modules/message/messageList');
var NoteList = require('../modules/note/noteList');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ConversationStore, "onStatusChange")],

  getInitialState: function () {
    return {}
  },

  componentWillMount: function(){
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.statusChanel = this.pusher.subscribe('newStatus' + localStorage.email);
    this.messageChanel = this.pusher.subscribe('newMessage' + localStorage.email);
  },

  componentDidMount: function(){
    ConversationActions.fetchConversationRequest(localStorage.authenticationToken, "open");
  },

  onStatusChange: function (status) {
    this.setState(status)
  },

  render: function() {
    var conversations = this.state.conversations;
    if (conversations && conversations.length > 0){
      var initialMessages = conversations[0].messages;
    }

    if (this.state.closedConversation && this.state.conversationStatus != 'closed'){
      var conversationId = this.state.closedConversation.id;
      _.remove(conversations, function(closedConversation){
        return closedConversation.id == conversationId
      })
    }

    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">

          <div className="row">
            <div className="col-lg-3">
              <FindConversation/>
              <ConversationHeader/>
            </div>
          </div>

          <div className="row">
            <div id="left" className="col-lg-3">
              <ConversationList statusChanel={this.statusChanel} conversations={conversations}/>
            </div>
            <div id="middle" className="col-lg-6">
              <MessageList messageChanel={this.messageChanel} statusChanel={this.statusChanel}/>
            </div>
            <div id="right" className="col-lg-3">
              <NoteList/>
            </div>
          </div>

        </div>
      </div>
    )
  }
});
