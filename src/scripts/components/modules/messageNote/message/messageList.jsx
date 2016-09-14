var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Message = require('./message');
var MessageStatus = require('./messageStatus');
var MessageForm = require('./messageForm');
var MessageActions = require('../../../../actions/messageActions');
var NoteActions = require('../../../../actions/noteActions');

module.exports = React.createClass({
  componentWillMount: function(){
    this.shouldScrollToBottom = true;
  },

  componentWillReceiveProps: function(newProps) {
    if(sessionStorage.user) var currentUser = JSON.parse(sessionStorage.user);
    var messages = newProps.messages;
    var newMessage = messages[messages.length - 1];
    var lastMessage = this.props.messages[this.props.messages.length - 1];
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    var currentUserSentLastMessage = newMessage && newMessage !== lastMessage && currentUser.id == newMessage.created_by.id;
    var selectedConversationWasChanged = newProps.conversation && this.props.conversation && newProps.conversation.id !== this.props.conversation.id;
    var loadingBatchMessages = newProps.page !== this.props.page;
    var scrollPositionAlreadyAtBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight;

    if (currentUserSentLastMessage) this.shouldScrollToBottom = true;
    else if (selectedConversationWasChanged) this.shouldScrollToBottom = true;
    else if (this.props.page === 1) this.shouldScrollToBottom = true;
    else if (loadingBatchMessages) this.shouldScrollToBottom = false;
    else this.shouldScrollToBottom = scrollPositionAlreadyAtBottom;
  },

  componentDidUpdate: function(prevProps, prevState) {
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    var loadingBatchMessages = this.props.page !== prevProps.page;
    if (loadingBatchMessages) node.scrollTop = node.scrollHeight - this.scrollHeightBeforePagination;
    this.scrollToBottomIfNeeded();
  },

  scrollToBottomIfNeeded: function() {
    if (this.shouldScrollToBottom) {
      var node = ReactDom.findDOMNode(this.refs.conversationContainer);
      node.scrollTop = node.scrollHeight - node.offsetHeight;
    }
  },

  handleScroll: function() {
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    var conversation = this.props.conversation;

    if(conversation && node.scrollTop === 0){
      this.scrollHeightBeforePagination = node.scrollHeight;
      MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken,
                                           conversation.id,
                                           this.props.page,
                                           this.props.offset);
    }
  },

  renderMessages: function(messages) {
    if(!messages){
      var messageElements = <div></div>
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
                                       toggleOpen={this.props.toggleOpen}
         />;

        messages[i].message_type === 'bot_message' ? prevType : prevType = messages[i].message_type;
      }
    } else {
      var messageElements = <div className="medium-font-size empty-conversation-container"> Nothing to see here. Please select another conversation on the left or use search box above to find a customer that needs help. </div>;
    }

    return messageElements
  },

  render: function () {
    var messageForm;
    if (this.props.conversation) {
      messageForm = (
        <MessageForm conversation={this.props.conversation} staff={this.props.staff}/>
      );
    } else {
      messageForm = (
        <div className="empty-message-form"></div>
      );
    }
    return (
      <div className="chat-container">
        <div id="chatbox" className="pre-scrollable panel panel-body">
          <div id="chatmessages" ref="conversationContainer" onScroll={this.handleScroll}>
            {this.renderMessages(this.props.messages)}
          </div>
        </div>
        {messageForm}
      </div>
    )
  }
});
