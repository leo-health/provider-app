var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Conversation = require('./conversation');
var ConversationActions = require('../../../actions/conversationActions');
var MessageActions = require('../../../actions/messageActions');
var ConversationStore = require('../../../stores/conversationStore');
var MessageStore = require('../../../stores/messageStore');
var NoteStore = require('../../../stores/noteStore');
var Infinite = require('react-infinite');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ConversationStore, "onConversationStatusChange"),
    Reflux.listenTo(MessageStore, 'onMessageStatusChange'),
    Reflux.listenTo(NoteStore, 'onNoteStatusChange')
  ],

  getInitialState: function () {
    return {
      selectedConversation: 0,
      conversationState: 'open',
      page: 1,
      conversations: undefined,
      maxPage: 1,
      offset: 0
    }
  },

  //onNoteStatusChange: function(status){
  //
  //},

  //onMessageStatusChange: function(status){
  //  if(status.newMessage) {
  //    this.setState({
  //      conversations: conversations
  //    })
  //  }
  //},

  onConversationStatusChange: function(status){
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

    if(status.newConversation && status.newConversation.state === this.state.conversationState){
     this.state.conversations.unshift(status.newConversation);
     this.setState({
       conversations: this.state.conversations,
       offset: this.state.offset += 1,
       selectedConversation: this.state.selectedConversation += 1
     })
    }
  },

  handleOnClick: function(i, conversationId){
    this.setState({selectedConversation: i});
    MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken, conversationId, 1, 0);
  },

  componentWillMount: function () {
    ConversationActions.fetchConversationsRequest( sessionStorage.authenticationToken, this.state.conversationState, this.state.page );
  },

  //componentDidMount: function() {
  //  var channel = this.props.pusher.subscribe('private-conversation');
  //  channel.bind('new_conversation', function(data){
  //    if(data.conversation_state === this.state.conversationState) this.fetchNewConversation(data.id)
  //  }, this);
  //},

  fetchNewConversation: function(id) {
    ConversationActions.fetchConversationById(sessionStorage.authenticationToken, id)
  },

  handleScroll: function() {
    var node = ReactDom.findDOMNode(this.refs.conversationList);
    if(node.scrollTop + node.offsetHeight === node.scrollHeight){
      ConversationActions.fetchConversationsRequest( sessionStorage.authenticationToken,
                                                     this.state.conversationState,
                                                     this.state.page,
                                                     this.state.offset)
    }
  },

  render: function () {
    var conversations = this.state.conversations;
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
                        initialLastMessage = {conversation.last_message}
                        primaryGuardian = {conversation.primary_guardian}
                        guardians = {conversation.guardians}
                        patients = {conversation.patients}
                        createdAt = {conversation.last_message_created_at }
                        conversationState = {conversation.state}
                        onClick = {boundClick}
                        pusher = {this.props.pusher}
          />
        )
      }, this);
    } else {
      var state = this.state.conversationState;
      if(state === parseInt(state, 10)){
        conversations = <div>There is no matching conversation.</div>
      }else{
        conversations = <div> There are no more {state} conversations for you to review. Please be sure to review the other sections. </div>;
      }
    }

    return (
      <div className="tab-pane fade active in panel panel-default pre-scrollable-left tab-content"
           id="all-tab"
           ref="conversationList"
           onScroll={this.handleScroll}>
        {conversations}
      </div>
    )
  }
});
