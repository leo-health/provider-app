var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageHeader = require('./messageHeader');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var ConversationStore = require('../../../stores/conversationStore');
var MessageActions = require('../../../actions/messageActions');
var ConversationStore = require('../../../stores/conversationStore');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MessageStore),
    Reflux.connect(ConversationStore)
  ],

  getInitialState: function(){
    return {messages: []}
  },

  componentWillMount: function(){
    MessageActions.fetchStaffRequest(localStorage.authenticationToken)
  },

  componentDidMount: function(){
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
    if (this.state.messages.length > 0){
      var messages = this.state.messages;
    }else{
      var messages = this.props.initialMessages;
    }
    if(messages){
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
    var staff = this.state.staff;

    return (
      <div>
        <MessageHeader/>
        <div id="conversation-container" className="pre-scrollable panel panel-body" ref="conversationContainer">
          {messages}
        </div>
        <MessageForm conversationId={currentConversationId} messageContainer={this.refs.conversationContainer} staff={staff}/>
      </div>
    )
  }
});
