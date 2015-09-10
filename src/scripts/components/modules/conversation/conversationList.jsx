var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var ConversationStore = require('../../../stores/conversationStore');
var ConversationHeader = require('./conversationHeader');
var Conversation = require('./conversation');

module.exports = React.createClass({
  render: function () {
    var conversations = this.props.conversations;
    var that = this;
    if (conversations) {
      conversations = conversations.map(function(conversation, i){
        return (
          <Conversation key = {i}
                        reactKey = {i}
                        conversationId = {conversation.id}
                        lastMessage = {conversation.last_message}
                        guardian = {conversation.primary_guardian}
                        patients = {conversation.users.patients}
                        createdAt = {conversation.last_message_created_at }
                        conversationStatus = {conversation.status}
                        messages = {conversation.messages}
                        statusChanel = {that.props.statusChanel}
          />
        )
      })
    }
    return (
      <div>
        <ConversationHeader/>
        <div id="content" className="tab-content">
          <div className="tab-pane fade active in" id="all-tab">
            <div className="panel panel-default pre-scrollable-left">
              {conversations}
            </div>
          </div>
        </div>
      </div>
    )
  }
});
