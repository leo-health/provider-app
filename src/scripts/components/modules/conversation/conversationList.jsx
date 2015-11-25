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
    return { selectedConversation: 0,
             conversationState: 'open',
             page: 1,
             conversations: [],
             maxPage: 1
    }
  },

  onStatusChange: function(status){
    if(status.conversationState && status.conversationState != this.state.conversationState){
      this.setState({ conversationState: status.conversationState,
                      page: 1,
                      selectedConversation: 0,
                      maxPage: 1,
                      conversations: []
                     });
    }

    if(status.conversations) {
      this.setState({
        conversations: this.state.conversations.concat(status.conversations),
        page: this.state.page += 1,
        maxPage: status.maxPage
      })
    }
  },

  handleOnClick: function(i, conversationId){
    this.setState({selectedConversation: i});
    MessageActions.fetchMessagesRequest( localStorage.authenticationToken, conversationId);
  },

  handleInfiniteLoad: function () {
    if(this.state.page <= this.state.maxPage){
      ConversationActions.fetchConversationRequest( localStorage.authenticationToken, this.state.conversationState, this.state.page )
    }
  },

  render: function () {
    var conversations = this.state.conversations;
    conversations = conversations.map(function(conversation, i){
      var selected = this.state.selectedConversation == i;
      var boundClick = this.handleOnClick.bind(this, i, conversation.id);
      return (
        <Conversation key = {i}
                      selected = {selected}
                      conversationId = {conversation.id}
                      lastMessage = {conversation.last_message}
                      guardian = {conversation.primary_guardian}
                      patients = {conversation.patients}
                      createdAt = {conversation.last_message_created_at }
                      conversationState = {conversation.state}
                      stateChanel = {this.props.stateChanel}
                      onClick = {boundClick}
        />
      )
    }, this);

    return (
      <div id="content" className="tab-content">
        <div className="tab-pane fade active in" id="all-tab">
          <Infinite className="panel panel-default pre-scrollable-left"
                    containerHeight={window.innerHeight}
                    elementHeight={80}
                    infiniteLoadBeginEdgeOffset={7}
                    onInfiniteLoad={this.handleInfiniteLoad}
                    >
            {conversations}
          </Infinite>
        </div>
      </div>
    )
  }
});
