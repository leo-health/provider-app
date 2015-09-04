var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageHeader = require('./messageHeader');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var MessageActions = require('../../../actions/messageActions');
var ConversationStore = require('../../../stores/conversationStore');
var UserStore = require('../../../stores/userStore');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MessageStore),
    Reflux.connect(UserStore)
  ],

  //getInitialState: function(){
  //  return {messages: [{id: 55, body: "hahahahaha", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}},
  //    {id: 56, body: "yayaya", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}},
  //    {id: 57, body: "wawawawawa", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}}]}
  //  var currentConversationId = ConversationStore.getFirstConversationId();
  //
  //  return {
  //    messages: MessageActions.fetchMessageRequest(localStorage.authenticationToken, currentConversationId)
  //  }
  //},

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
    var messages = this.state.messages;
    debugger
    if(messages){
      var currentConversationId = messages[0].conversation_id;
      messages = messages.map(function(message){
        return <Message key={message.id}
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
