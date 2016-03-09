var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var _ = require('lodash');
var Conversation = require('./conversation');
var ConversationActions = require('../../../actions/conversationActions');
var MessageActions = require('../../../actions/messageActions');
var ConversationStore = require('../../../stores/conversationStore');
var Infinite = require('react-infinite');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ConversationStore, "onConversationStatusChange")
  ],

  getInitialState: function () {
    return {
      selectedConversationId: undefined,
      conversationState: 'open',
      page: 1,
      conversations: [],
      maxPage: 1,
      offset: 0
    }
  },

  onConversationStatusChange: function(status){
    if(status.conversationState && status.conversationState != this.state.conversationState){
      this.setState({
        conversationState: status.conversationState,
        page: 1,
        selectedConversationId: undefined,
        maxPage: 1,
        conversations: []
      });
    }

    if(status.conversations) {
      this.setState({
        conversations: status.conversations,
        page: this.state.page += 1,
        maxPage: status.maxPage,
        selectedConversationId: status.conversations[0].id
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
       offset: this.state.offset += 1
     })
    }
  },

  removeConversationFromList: function (conversation_id) {
    this.setState({
      conversations: _.reject(this.state.conversations, {id: conversation_id}),
      offset: this.state.offset -= 1
    });
  },

  moveConversationToTop: function (targetIndex, lastMessageBody) {
    this.setState({
      conversations: this.moveElementToFront(this.state.conversations, targetIndex, lastMessageBody)
    });
  },

  moveElementToFront: function(array, index, lastMessageBody){
    var temp = array[index];
    array[index] = array[0];
    array[0] = temp;
    array[0].last_message = lastMessageBody;
    return array
  },

  handleOnClick: function(conversationId){
    this.setState({selectedConversationId: conversationId});
    MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken, conversationId, 1, 0);
  },

  componentWillMount: function () {
    ConversationActions.fetchConversationsRequest( sessionStorage.authenticationToken, this.state.conversationState, this.state.page );
  },

  componentDidMount: function() {
    var channel = this.props.pusher.subscribe('private-newConversation');
    channel.bind('new_conversation', function(data){
      if(data.conversation_state === this.state.conversationState){
        if(this.state.conversationState === "escalated" && this.isInConversationList(data.id)) return;
        this.fetchNewConversation(data.id)
      }
    }, this);
  },

  componentWillUnmount: function () {
    this.props.pusher.unsubscribe('private-conversation')
  },

  isInConversationList: function(conversation_id){
    return !!_.find(this.state.conversations, {id: conversation_id})
  },

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
    if (conversations.length > 0){
      conversations = conversations.map(function(conversation, i){
        var selected = this.state.selectedConversationId === conversation.id;
        var boundClick = this.handleOnClick.bind(this, conversation.id);

        return (
          <Conversation key = {i}
                        reactKey = {i}
                        selected = {selected}
                        conversationId = {conversation.id}
                        lastMessage = {conversation.last_message}
                        primaryGuardian = {conversation.primary_guardian}
                        guardians = {conversation.guardians}
                        patients = {conversation.patients}
                        createdAt = {conversation.last_message_created_at }
                        conversationState = {conversation.state}
                        onClick = {boundClick}
                        pusher = {this.props.pusher}
                        removeConversationFromList = {this.removeConversationFromList}
                        moveConversationToTop = {this.moveConversationToTop}
                        currentListState = {this.state.conversationState}
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
