var React = require('react');
var Conversation = require('./conversation');
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  handleOnClick: function(i, conversationId){
    this.setState({selectedConversation: i});
    MessageActions.fetchMessagesRequest(localStorage.authenticationToken, conversationId);
  },

  getInitialState: function () {
    return {selectedConversation: 0}
  },

  componentWillReceiveProps: function(){
    this.setState({selectedConversation: 0});
  },

  render: function () {
    var conversations = this.props.conversations;
    if (conversations) {
      conversations = conversations.map(function(conversation, i){
        var selected = this.state.selectedConversation == i;
        var boundClick = this.handleOnClick.bind(this, i, conversation.id);
        return (
          <Conversation key = {i}
                        selected = {selected}
                        conversationId = {conversation.id}
                        lastMessage = {conversation.last_message}
                        guardian = {conversation.primary_guardian}
                        patients = {conversation.users.patients}
                        createdAt = {conversation.last_message_created_at }
                        conversationState = {conversation.state}
                        messages = {conversation.messages}
                        statusChanel = {this.props.statusChanel}
                        onClick = {boundClick}
          />
        )
      }, this)
    }
    return (
      <div>
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
