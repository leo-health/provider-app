var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var ConversationStore = require('../../../stores/conversationStore');
var ConversationHeader = require('./conversationHeader');
var Conversation = require('./conversation');

module.exports = React.createClass({
  mixins: [
    Reflux.connect(ConversationStore)
    //Reflux.listenTo(ConversationStore, "onStatusChange")
  ],

  componentWillMount: function(){
    ConversationActions.fetchConversationRequest(localStorage.authentication_token);
  },

  render: function () {
    var conversations = this.state.conversations;
    if (this.state.status == "ok") {
      conversations = conversations.map(function(conversation, i){
        return <Conversation key = {i}
                             conversation_id = {conversation.id}
                             lastMessage = {conversation.last_message}
                             guardian = {conversation.primary_guardian}
                             patients = {conversation.users.patients}
                             createdAt = {conversation.last_message_created_at }
                             conversationStatus = {conversation.status}
                />
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
