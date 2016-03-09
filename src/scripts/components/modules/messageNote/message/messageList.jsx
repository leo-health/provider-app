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

  componentDidMount: function() {
    this.scrollToBottomIfNeeded();
  },

  componentWillUpdate: function() {
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    this.shouldScrollToBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight;
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.scrollToBottomIfNeeded();
  },

  scrollToBottomIfNeeded: function() {
    if (this.shouldScrollToBottom) {
      var node = ReactDom.findDOMNode(this.refs.conversationContainer);
      node.scrollTop = node.scrollHeight;
    }
  },

  handleScroll: function() {
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    var conversationId = this.props.currentConversationId;
    if(conversationId && node.scrollTop === 0){
      MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken,
                                           this.props.currentConversationId,
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
         />;

        messages[i].message_type === 'bot_message' ? prevType : prevType = messages[i].message_type;
      }
    } else {
      var messageElements = <div> Nothing to see here. Please select another conversation on the left or use search box above to find a customer that needs help. </div>;
    }

    return messageElements
  },

  render: function () {
    return (
      <div>
        <div id="chatbox" className="pre-scrollable panel panel-body">
          <div id="chatmessages" ref="conversationContainer" onScroll={this.handleScroll}>
            {this.renderMessages(this.props.messages)}
          </div>
        </div>
        <MessageForm conversationId={this.props.currentConversationId}/>
      </div>
    )
  }
});
