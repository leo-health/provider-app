var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Message = require('./message');
var MessageStatus = require('./messageStatus');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var MessageActions = require('../../../actions/messageActions');

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

      this.setState({
                      messages: this.state.messages.concat(new_message)
                    })

    }else{
      this.setState({
                      messages: status.messages,
                      initMessageId: status.initMessageId,
                      currentConversationId: status.currentConversationId
                    })
    }
  },

  componentDidMount: function(){
    this.props.messageChannel.bind('new_message', function(data){
      if(this.state.currentConversationId == data.conversation_id){
        MessageActions.fetchMessageRequest(localStorage.authenticationToken, data.message_id);
      }
    }, this);

    this.props.stateChannel.bind('new_state', function(data){
      if(this.state.currentConversationId == data.conversation_id && data.message_type != "open"){
        this.setState({messages: this.state.messages.concat(data)})
      }
    }, this)
  },

  componentWillUpdate: function(){
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function(){
    if (this.shouldScrollBottom){
      var node = ReactDom.findDOMNode(this.refs.conversationContainer);
      node.scrollTop = node.scrollHeight;
    }
  },

  render: function () {
    var messages = this.state.messages;
    var currentConversationId = this.state.currentConversationId;

    if(messages && messages.length > 0){
      var count = messages.length;
      var prevType = 'close';
      var messageElements = [];
      for(var i = 0; i < messages.length; i++){

        messageElements[i] =  <Message key={i}
                                       reactKey={i}
                                       id={msg.id}
                                       count={count}
                                       prevType={prevType}
                                       body={msg.message_body}
                                       sender={msg.created_by}
                                       sentAt={msg.created_at}
                                       escalatedTo = {msg.escalated_to}
                                       messageType = {msg.message_type}
                                       typeName = {msg.type_name}
                                       link={this.props.link}
            />

        messages[i].message_type === 'bot_message' ? prevType : prevType = messages[i].message_type;
      }
    } else {
      messageElements = <div> Nothing to see here. Please select another conversation on the left or use search box above to find a customer that needs help. </div>;
    }

    return (
      <div>
        <div id="chatbox" className="pre-scrollable panel panel-body">
          <div id="chatmessages" ref="conversationContainer">
            {messageElements}
          </div>
        </div>
        <MessageForm conversationId={currentConversationId} staff={this.state.staff}/>
      </div>
    )
  }
});
