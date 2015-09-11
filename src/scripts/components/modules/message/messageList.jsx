var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageHeader = require('./messageHeader');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var ConversationStore = require('../../../stores/conversationStore');
var UserStore = require('../../../stores/userStore');
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MessageStore),
    Reflux.connect(ConversationStore),
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
    if(this.state.init){
      var messages = this.props.initialMessages;
      if(messages && messages.length > 0){
        var messages = messages.concat(this.state.messages)
      }
    }else{
      var messages = this.state.messages;
    }
    if(messages && messages.length > 0){
      var currentConversationId = messages[0].conversation_id;
      messages = messages.map(function(message, i){
        return <Message key={i}
                        body={message.body}
                        sender={message.sender}
                        escalatedTo={message.escalated_to}
                        sentAt={message.created_at}
            />
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
