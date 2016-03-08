var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Message = require('./message');
var MessageStatus = require('./messageStatus');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');
var ConversationStore = require('../../../stores/conversationStore');
var MessageActions = require('../../../actions/messageActions');
var NoteActions = require('../../../actions/noteActions');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange'),
    Reflux.listenTo(ConversationStore, 'onConversationStatusChange')
  ],

  getInitialState: function(){
    this.shouldScrollToBottom = true;
    return{
      messages: undefined,
      currentConversationId: undefined,
      init: true,
      page: 1,
      offset: 0
    }
  },

  onConversationStatusChange: function(status){
    if(status.newNote) {
      this.setState({
        messages: this.state.messages.concat(status.newNote),
        offset: this.state.offset += 1
      })
    }
  },

  onNoteStatusChange: function(status){
    if(status.newNote) {
      this.setState({
        messages: this.state.messages.concat(status.newNote),
        offset: this.state.offset += 1
      })
    }
  },

  onMessageStatusChange: function(status){
    if(status.newMessage) {
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

    if(status.messages) {
      this.setState({
        messages: status.messages,
        currentConversationId: status.currentConversationId,
        page: 2
      })
    }
  },

  componentDidMount: function() {
    this.scrollToBottomIfNeeded();
  },

  componentWillUpdate: function() {
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    this.shouldScrollToBottom = (node.scrollTop + node.offsetHeight) === node.scrollHeight;
  },

  componentDidUpdate: function(prevProps, prevState) {
    //this.subscribeToPusher(prevState.currentConversationId, this.state.currentConversationId);
    this.scrollToBottomIfNeeded();
  },

  //
  //subscribeToPusher: function(prevConversationId, currentConversationId) {
  //  if ( currentConversationId && currentConversationId != prevConversationId ) {
  //
  //    if (prevConversationId) this.props.pusher.unsubscribe('private-conversation' + prevConversationId);
  //    var channel = this.props.pusher.subscribe('private-conversation' + currentConversationId);
  //    channel.bind('new_message', function(data){
  //      this.fetchNewMessage(data)
  //    }, this);
  //  }
  //},
  //
  //fetchNewMessage: function(data) {
  //  var currentUser = JSON.parse(sessionStorage.user);
  //
  //  if (currentUser.id != data.sender_id) {
  //    if (data.message_type === "message") {
  //      MessageActions.fetchMessageRequest(sessionStorage.authenticationToken, data.id);
  //    } else{
  //      NoteActions.fetchNoteRequest(sessionStorage.authenticationToken, data.id, data.message_type)
  //    }
  //  }
  //},

  scrollToBottomIfNeeded: function() {
    if (this.shouldScrollToBottom) {
      var node = ReactDom.findDOMNode(this.refs.conversationContainer);
      node.scrollTop = node.scrollHeight;
    }
  },

  handleScroll: function() {
    var node = ReactDom.findDOMNode(this.refs.conversationContainer);
    var conversationId = this.state.currentConversationId;
    if(conversationId && node.scrollTop === 0){
      MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken,
                                           this.state.currentConversationId,
                                           this.state.page,
                                           this.state.offset);
    }
  },

  renderMessages: function(messages) {
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
         />;

        messages[i].message_type === 'bot_message' ? prevType : prevType = messages[i].message_type;
      }
    } else {
      var messageElements = <div> Nothing to see here. Please select another conversation on the left or use search box above to find a customer that needs help. </div>;
    }

    return messageElements
  },

  render: function () {
    var messages = this.state.messages;
    var currentConversationId = this.state.currentConversationId;
    messages = this.renderMessages(messages);

    return (
      <div>
        <div id="chatbox" className="pre-scrollable panel panel-body">
          <div id="chatmessages" ref="conversationContainer" onScroll={this.handleScroll}>
            {messages}
          </div>
        </div>
        <MessageForm conversationId={currentConversationId} staff={this.state.staff}/>
      </div>
    )
  }
});
