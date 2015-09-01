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
    Reflux.listenTo(MessageStore, "onStatusChange")
  ],

  getInitialState: function(){
    return {messages: [{id: 55, body: "hahahahaha", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}},
      {id: 56, body: "yayaya", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}},
      {id: 57, body: "wawawawawa", sender: {title: "Mr", first_name: "Loka", last_name: "Mata"}}]}
  },

  componentWillMount: function(){
    debugger
  },

  onStatusChange: function(status){
    if(status.new_message){
      this.setState({messages: this.state.messages.concat(this.state.new_message)})
    }else{
      this.setState(status);
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
        <div id="conversation-container" className="pre-scrollable panel panel-body">
          {messages}
        </div>
        <MessageForm conversationId={currentConversationId}/>
      </div>
    )
  }
});
