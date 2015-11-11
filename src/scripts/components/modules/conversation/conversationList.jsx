var React = require('react');
var Conversation = require('./conversation');
var MessageActions = require('../../../actions/messageActions');
var Infinite = require('react-infinite');

module.exports = React.createClass({
  handleOnClick: function(i, conversationId){
    this.setState({selectedConversation: i});
    MessageActions.fetchMessagesRequest(localStorage.authenticationToken, conversationId);
  },

  getInitialState: function () {
    return {selectedConversation: 0, isInfiniteLoading: false}
  },

  componentWillReceiveProps: function(){
    this.setState({selectedConversation: 0});
  },

  elementInfiniteLoad: function() {
    return <div className="infinite-list-item">
      Loading...
    </div>;
  },

  render: function () {
    var conversations = this.props.conversations;
    if (conversations && conversations.length > 0) {
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
                        stateChanel = {this.props.stateChanel}
                        onClick = {boundClick}
          />
        )
      }, this)
    }
    return (
      <div id="content" className="tab-content">
        <div className="tab-pane fade active in" id="all-tab">
          <Infinite className="panel panel-default pre-scrollable-left"
                    elementHeight={40}
                    containerHeight={250}
                    onInfiniteLoad={this.handleInfiniteLoad}
                    loadingSpinnerDelegate={this.elementInfiniteLoad}
                    isInfiniteLoading={this.state.isInfiniteLoading}>
            {conversations}
          </Infinite>
        </div>
      </div>
    )
  }
});
