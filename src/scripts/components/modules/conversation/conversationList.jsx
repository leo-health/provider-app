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
      conversations = conversations.map(function(conversation){
        return <Conversation key = {conversation.id}
                             guardians = {conversation.users.guardians}
                             patients = {conversation.users.patients}
                             latestMessage = {conversation.messages[0]}
                             messages = { conversation.messages }
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
