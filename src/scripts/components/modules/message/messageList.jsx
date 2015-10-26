var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageStatus = require('./messageStatus');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var MessageActions = require('../../../actions/messageActions');
var prevMessageType;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onStatusChange')
  ],

  getInitialState: function(){
    return{ messages: [], init: true }
  },

  onStatusChange: function(status){
    if(status.new_message){
      var new_message = { message_body: status.new_message.body,
                          created_by: status.new_message.sender,
                          created_at: status.new_message.created_at,
                          message_type: 'message' };
      this.setState({ messages: this.state.messages.concat(new_message)})
    }else{
      this.setState({ messages: status.messages,
                      currentConversationId: status.currentConversationId })
    }
  },

  componentDidMount: function(){
    this.props.messageChanel.bind('new_message', function(data){
      if(this.state.currentConversationId == data.conversation_id){
        MessageActions.fetchMessageRequest(localStorage.authenticationToken, data.message_id);
      }
    }, this);

    this.props.stateChanel.bind('new_state', function(data){
      if(this.state.currentConversationId == data.conversation_id){
        this.setState({messages: this.state.messages.concat(data)})
      }
    }, this)
  },

  //componentWillUpdate: function(){
  //  var node = React.findDOMNode(this.refs.conversationContainer);
  //  this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  //},

  //componentDidUpdate: function(){
  //  if (this.shouldScrollBottom){
  //    var node = React.findDOMNode(this.refs.conversationContainer);
  //    node.scrollTop = node.scrollHeight;
  //  }
  //},

  checkClosedMessage: function(msg){
    var prevType = prevMessageType;
    if(msg.message_type == 'close'){
      prevMessageType = 'close';
    }else if(msg.message_type == 'escalation'){
      prevMessageType = 'escalation';
    }else{
      prevMessageType = 'message';
    }
    return prevType
  },

  render: function () {
    var messages = this.state.messages;
    var currentConversationId = this.state.currentConversationId;
    if(messages){
      var count = messages.length;
      var messages = messages.map(function(msg, i){
        var previousType = this.checkClosedMessage(msg);
        return <Message key={i}
                        reactKey={i}
                        id={msg.id}
                        count={count}
                        previousType={previousType}
                        body={msg.message_body}
                        sender={msg.created_by}
                        sentAt={msg.created_at}
                        escalatedTo = {msg.escalated_to}
                        messageType = {msg.message_type}
               />
      }, this);
    }
    prevMessageType = 'init';
    return (
      <div>
        <div id="conversation-container" className="pre-scrollable panel panel-body" ref="conversationContainer">
          {messages}
        </div>
        <MessageForm conversationId={currentConversationId} staff={this.state.staff}/>
      </div>
    )
  }
});
