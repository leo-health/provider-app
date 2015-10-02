var React = require('react');
var Reflux = require('reflux');
var Message = require('./message');
var MessageHeader = require('./messageHeader');
var MessageForm = require('./messageForm');
var MessageStore = require('../../../stores/messageStore');
var MessageActions = require('../../../actions/messageActions');
var ConversationStore = require('../../../stores/conversationStore');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(MessageStore),
    Reflux.listenTo(ConversationStore, "onStatusChange")
  ],

  getInitialState: function(){
    return {messages: [{id: 55, body: "hahahahaha", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}},
      {id: 56, body: "yayaya", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}},
      {id: 57, body: "wawawawawa", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}}]}
  },

  componentWillMount: function(){
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.messageChanel = this.pusher.subscribe(localStorage.email)
  },

  componentDidMount: function(){
    this.messageChanel.bind('new_message', function(message){
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

  onStatusChange: function(status){
    if(status.closedConversation){

    }
  },

  render: function () {
    var messages = this.state.messages;
    var currentConversationId = messages[0].conversation_id;
    messages = messages.map(function(message){
      return <Message key={message.id}
                      body={message.body}
                      sender={message.sender}
                      sentAt={message.created_at}
             />
    });

    return (
      <div>
        <MessageHeader/>
        <div id="conversation-container" className="pre-scrollable panel panel-body" ref="conversationContainer">
          {messages}
        </div>
        <MessageForm conversationId={currentConversationId} messageContainer={this.refs.conversationContainer}/>
      </div>
    )
  }
});
