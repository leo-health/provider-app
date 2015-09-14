var React = require('react');
var Reflux = require('reflux');
var HomeHeader = require('./homeHeader');
var ConversationActions = require('../../actions/conversationActions');
var ConversationStore = require('../../stores/conversationStore');
var FindConversation = require('../modules/search/findConversation');
var ConversationList = require('../modules/conversation/conversationList');
var MessageList = require('../modules/message/messageList');
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

    //if (this.state.closedConversation){
    //  var conversationId = this.state.closedConversation.id;
    //  _.remove(conversations, function(closedConversation){
    //    return closedConversation.id == conversationId
    //  })
    //}

    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div id="left" className="col-lg-4">
              <FindConversation/>
              <ConversationList statusChanel={this.statusChanel} conversations={conversations}/>
            </div>
            <div id="right" className="col-lg-8">
              <MessageList messageChanel={this.messageChanel} initialMessages={initialMessages}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
