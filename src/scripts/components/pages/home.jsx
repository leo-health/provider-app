var React = require('react');
var Reflux = require('reflux');
var HomeHeader = require('./homeHeader');
var ConversationActions = require('../../actions/conversationActions');
var ConversationStore = require('../../stores/conversationStore');
var FindConversation = require('../modules/search/findConversation');
var ConversationList = require('../modules/conversation/conversationList');
var MessageList = require('../modules/message/messageList');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(ConversationStore)
  ],

  componentWillMount: function(){
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.statusChanel = this.pusher.subscribe('newStatus' + localStorage.email);
    this.messageChanel = this.pusher.subscribe('newMessage' + localStorage.email);
    //ConversationActions.fetchConversationRequest(localStorage.authenticationToken, "open");
  },

  componentDidMount: function(){

  },

  render: function() {
    var conversations = this.state.conversations;
    if (conversations){
      var ID = conversations[0].id
    }
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
              <MessageList messageChanel={this.messageChanel} ID={ID}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
