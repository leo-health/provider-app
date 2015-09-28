var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageStatus = require('./messageStatus');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var ConversationStore = require('../../../stores/conversationStore');
var UserStore = require('../../../stores/userStore');
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MessageStore),
    Reflux.connect(UserStore)
  ],

  getInitialState: function(){
    return {messages: [],
            init: true}
  },

  componentDidMount: function(){
    MessageActions.fetchStaffRequest(localStorage.authenticationToken);
    this.props.messageChanel.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})
    }, this);
  },

  componentWillUpdate: function(){
    var node = React.findDOMNode(this.refs.conversationContainer);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function(){
    if (this.shouldScrollBottom){
      var node = React.findDOMNode(this.refs.conversationContainer);
      node.scrollTop = node.scrollHeight;
    }
  },

  render: function () {
    var messages = this.state.messages;
    var currentConversationId = this.state.currentConversationId;
    if(messages && messages.length > 0){
      //var reversedMessage = messages.reverse();
      var test = messages.map(function(msg, i){
        return <Message key={i}
                        body={msg.regular_message.body}
                        sender={msg.regular_message.sender}
                        sentAt={msg.regular_message.sentAt}
                        messageType = {'regularMessage'}
                        previousMessageClosed={false}
                        nextMessageFromSystem = {false}/>
        //var messageType;
        //var sender;
        //var sentAt;
        //var body;
        //var previousMessageClosed = false;
        //var nextMessageFromSystem = false;

        //if(msg.hasOwnProperty('system_message')){
        //  sender = msg.system_message.owner;
        //  body = msg.system_message.key;
        //  messageType = "systemMessage";
        //  if (msg.system_message.key == "conversation.conversation_closed"){
        //    previousMessageClosed = true
        //  }
        //}else{
        //  sender = msg.regular_message.sender;
        //  sentAt = msg.regular_message.created_at;
        //  body = msg.regular_message.body;
        //  messageType = "regularMessage";
        //
        //  if (i == 1){
        //    previousMessageClosed = true
        //  }
        //  var next_message = messages.reverse()[i+1];
        //  if (next_message && next_message.hasOwnProperty('system_message')){
        //    nextMessageFromSystem = true
        //  }
        //}
        //sender = msg.regular_message.sender;
        //sentAt = msg.regular_message.created_at;
        //body = msg.regular_message.body;
        //messageType = "regularMessage";
        //if (i == 1){
        //  previousMessageClosed = true
        //}
        //var next_message = messages.reverse()[i+1];
        //if (next_message && next_message.hasOwnProperty('system_message')){
        //  nextMessageFromSystem = true
        //}
        //return <Message key={i}
        //                body={body}
        //                sender={sender}
        //                sentAt={sentAt}
        //                messageType = {messageType}
        //                previousMessageClosed={previousMessageClosed}
        //                nextMessageFromSystem = {nextMessageFromSystem}/>
      });
    }
    return (
      <div>
        <div id="conversation-container" className="pre-scrollable panel panel-body" ref="conversationContainer">
          {test}
        </div>
        <MessageForm conversationId={currentConversationId} messageContainer={this.refs.conversationContainer} staff={this.state.staff}/>
      </div>
    )
  }
});
