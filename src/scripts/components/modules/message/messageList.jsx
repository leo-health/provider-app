var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageHeader = require('./messageHeader');
var MessageStatus = require('./messageStatus');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var ConversationStore = require('../../../stores/conversationStore');
var UserStore = require('../../../stores/userStore');
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MessageStore),
    //Reflux.listenTo(MessageStore, 'onStatusChange'),
    Reflux.connect(UserStore)
  ],

  getInitialState: function(){
    return {messages: [],
            init: true}
  },

  //onStatusChange: function(status) {
  //  this.setState(status);
  //},

  componentDidMount: function(){
    MessageActions.fetchStaffRequest(localStorage.authenticationToken);
    this.props.messageChanel.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})
    }, this);

    this.props.statusChanel.bind('new_status', function(status){
      if(status.new_status){

      }
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
      this.previousMessageClosed = false;
      this.nextMessageFromSystem = false;
      that = this;
      debugger
      messages = messages.reverse().map(function(message, i){
        if(message.system_message){
          debugger
          if (message.system_message.key == "conversation.conversation_closed"){
            that.previousMessageClosed = true
          }
          return <MessageStatus key={i}
                                body={message.system_message.key}
                                sender={message.system_message.owner}/>
        }else{
          debugger
          if (i == 1){
            that.previousMessageClosed = true
          }
          var next_message = messages.reverse()[i+1];
          if (next_message && next_message.system_message){
            that.nextMessageFromSystem = true
          }
          var previousMessageClosed = that.previousMessageClosed;
          var nextMessageFromSystem = that.nextMessageFromSystem;
          that.previousMessageClosed = false;
          that.nextMessageFromSystem = false;
          return <Message key={i}
                          body={message.regular_message.body}
                          sender={message.regular_message.sender}
                          escalatedTo={message.regular_message.escalated_to}
                          sentAt={message.regular_message.created_at}
                          previousMessageClosed={previousMessageClosed}
                          nextMessageFromSystem = {nextMessageFromSystem}/>
        }
      });
    }
    return (
      <div>
        <MessageHeader/>
        <div id="conversation-container" className="pre-scrollable panel panel-body" ref="conversationContainer">
          {messages}
        </div>
        <MessageForm conversationId={currentConversationId} messageContainer={this.refs.conversationContainer} staff={this.state.staff}/>
      </div>
    )
  }
});
