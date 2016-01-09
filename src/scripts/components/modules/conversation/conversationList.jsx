var React = require('react');
var Reflux = require('reflux');
var Conversation = require('./conversation');
var ConversationActions = require('../../../actions/conversationActions');
var MessageActions = require('../../../actions/messageActions');
var ConversationStore = require('../../../stores/conversationStore');
var Infinite = require('react-infinite');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ConversationStore, "onStatusChange")],

  getInitialState: function () {
    return {
      selectedConversation: 0,
      conversationState: 'open',
      page: 1,
      conversations: undefined,
      maxPage: 1
    }
  },

  onStatusChange: function(status){
    if(status.conversationState && status.conversationState != this.state.conversationState){
      this.setState({
        conversationState: status.conversationState,
        page: 1,
        selectedConversation: 0,
        maxPage: 1,
        conversations: []
      });
    }

    if(status.conversations) {
      this.setState({
        conversations: status.conversations,
        page: this.state.page += 1,
        maxPage: status.maxPage
      })
    }

    if(status.newConversations) {
      this.setState({
        conversations: this.state.conversations.concat(status.newConversations),
        page: this.state.page += 1,
        maxPage: status.maxPage
      })
    }
  },

  handleOnClick: function(i, conversationId){
    this.setState({selectedConversation: i});
    MessageActions.fetchMessagesRequest( localStorage.authenticationToken, conversationId, 1, 0);
  },

  componentDidMount: function() {
    var state = this.state.conversationState === "all" ? null : this.state.conversationState;
    ConversationActions.fetchConversationRequest( localStorage.authenticationToken, state, this.state.page )
  },

  //handleInfiniteLoad: function () {
  //  if(this.state.page <= this.state.maxPage){
  //    var state = this.state.conversationState === "all" ? null : this.state.conversationState
  //    ConversationActions.fetchConversationRequest( localStorage.authenticationToken, state, this.state.page )
  //  }
  //},

  render: function () {
    var conversations = this.state.conversations;
    debugger
    if(!conversations){
      conversations = <div></div>
    }else if (conversations.length > 0){
      conversations = conversations.map(function(conversation, i){
        var selected = this.state.selectedConversation == i;
        var boundClick = this.handleOnClick.bind(this, i, conversation.id);
        return (
          <Conversation key = {i}
                        selected = {selected}
                        conversationId = {conversation.id}
                        lastMessage = {conversation.last_message}
                        primaryGuardian = {conversation.primary_guardian}
                        guardians = {conversation.guardians}
                        patients = {conversation.patients}
                        createdAt = {conversation.last_message_created_at }
                        conversationState = {conversation.state}
                        stateChannel = {this.props.stateChannel}
                        onClick = {boundClick}
          />
        )
      }, this);
    } else {
      conversations = <div> There are no more {this.state.conversationState} conversations for you to review. Please be sure to review the other sections. </div>;
    }

    return (
      <div id="content" className="tab-content">
        <div className="tab-pane fade active in panel panel-default pre-scrollable-left" id="all-tab">
            {conversations}
        </div>
      </div>
    )
  }
});
