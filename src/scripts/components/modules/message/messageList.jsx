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
    return{
      messages: undefined,
      currentConversationId: undefined,
      init: true,
      page: 1,
      offset: 0
    }
  },

  onStatusChange: function(status){
    if(status.newMessage){
      var newMessage = {
        body: status.newMessage.body,
        created_by: status.newMessage.sender,
        created_at: status.newMessage.created_at,
        message_type: 'message',
        type_name: status.newMessage.type_name
      };

      this.setState({
        messages: this.state.messages.concat(newMessage),
        offset: this.state.offset += 1
      })
    }

    if(status.newBatchMessages){
      this.setState({
        messages: status.newBatchMessages.concat(this.state.messages),
        currentConversationId: status.currentConversationId,
        page: this.state.page += 1
      })
    }

    if(status.messages){
      this.setState({
        messages: status.messages,
        currentConversationId: status.currentConversationId,
        page: 2
      })
    }
  },

  componentDidMount: function(){
    //this.props.channel.bind('new_message', function(data){
    //  if(this.state.currentConversationId == data.conversation_id){
    //    MessageActions.fetchMessageRequest(sessionStorage.authenticationToken, data.message_id);
    //  }
    //}, this);
    //
    //this.props.channel.bind('new_state', function(data){
    //  if(this.state.currentConversationId == data.conversation_id && data.message_type != "open"){
    //    this.setState({
    //      messages: this.state.messages.concat(data),
    //      offset: this.state.offset += 1
    //    })
    //  }
    //}, this)
  },

  componentDidUpdate: function(){
    if (this.state.page < 3){
      var node = ReactDom.findDOMNode(this.refs.conversationContainer);
      node.scrollTop = node.scrollHeight;
    }
  },

  handleScroll: function(){
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    var conversationId = this.state.currentConversationId;

    if(conversationId && node.scrollTop === 0){
      MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken,
                                           this.state.currentConversationId,
                                           this.state.page,
                                           this.state.offset);
    }
  },

  render: function () {
    var messages = this.state.messages;
    var currentConversationId = this.state.currentConversationId;

    if(!messages){
      var messageElements= <div></div>
    }else if (messages && messages.length > 0){
      var prevType = 'init';
      var messageElements = [];

      for(var i = 0; i < messages.length; i++){
        var msg = messages[i];
        messageElements[i] =  <Message key={i}
                                       reactKey={i}
                                       id={msg.id}
                                       prevType={prevType}
                                       body={msg.body}
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
      var messageElements = <div> Nothing to see here. Please select another conversation on the left or use search box above to find a customer that needs help. </div>;
    }

    return (
      <div>
        <div id="chatbox" className="pre-scrollable panel panel-body">
          <div id="chatmessages" ref="conversationContainer" onScroll={this.handleScroll}>
            {messageElements}
          </div>
        </div>
        <MessageForm conversationId={currentConversationId} staff={this.state.staff}/>
      </div>
    )
  }
});
