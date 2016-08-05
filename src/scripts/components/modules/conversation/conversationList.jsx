var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var _ = require('lodash');
var Conversation = require('./conversation');
var ConversationHeader = require('./conversationHeader');
var ConversationActions = require('../../../actions/conversationActions');
var classNames = require('classnames');
var MessageActions = require('../../../actions/messageActions');
var UserActions = require('../../../actions/userActions');
var ConversationStore = require('../../../stores/conversationStore');
var UserStore = require('../../../stores/userStore');
var MessageNote = require('../messageNote/messageNote');
var Infinite = require('react-infinite');
var moment = require('moment');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ConversationStore, "onConversationStatusChange"),
    Reflux.listenTo(UserStore, "onUserStatusChange")
  ],

  getInitialState: function () {
    return {
      staff: [],
      selectedConversationId: undefined,
      conversationState: 'open',
      page: 1,
      conversations: [],
      maxPage: 1,
      offset: 0,
      selectedStaff: null,
      isSelectedConversation: false
    }
  },

  onUserStatusChange: function(status) {
    if(status.staffSelection){
      this.setState({
        staff: status.staffSelection
      })
    }
  },

  onConversationStatusChange: function(status){
    if(status.conversations) {
      this.setState({
        conversationState: status.conversationState,
        selectedStaff: status.selectedStaff,
        conversations: status.conversations,
        page: 2,
        maxPage: status.maxPage,
        selectedConversationId: status.conversations.length > 0 ? status.conversations[0].id : undefined,
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
       selectedConversationId: this.state.selectedConversationId ? this.state.selectedConversationId : status.newConversation.id
     })
    }
  },

  removeConversationFromList: function (conversation_id) {
    this.setState({
      conversations: _.reject(this.state.conversations, {id: conversation_id}),
      offset: this.state.offset -= 1
    });
  },

  moveConversationToTop: function (targetIndex, lastMessage) {
    var lastMessageBody = lastMessage.body;
    if(typeof lastMessageBody !== "string") lastMessageBody = "[image]";
    this.setState({
      conversations: this.moveElementToFront(this.state.conversations, targetIndex, lastMessageBody)
    });
    if(!this.props.desktop || window.windowHasFocus) return;
    this.notifyNewMessage(lastMessageBody, lastMessage.sender.first_name);
  },

  moveElementToFront: function(array, index, lastMessageBody){
    var temp = array[index];
    array.splice(index,1);
    array.splice(0,0,temp);
    array[0].last_message = lastMessageBody;
    array[0].last_message_created_at = moment();
    return array
  },

  notifyNewMessage: function(message, sender){
    var title = "New message from " + sender;
    var options = {
      body: message,
      icon: "../../images/leo-light.png"
    };
    var notification = new Notification(title, options);
    setTimeout(notification.close.bind(notification), 5000);
  },

  handleOnClick: function(conversationId){
    this.setState({
      selectedConversationId: conversationId,
      isSelectedConversation: true
    });
    MessageActions.fetchMessagesRequest( sessionStorage.authenticationToken, conversationId, 1, 0);
  },

  handleClickBack: function(){
    this.setState({isSelectedConversation: false});
  },

  componentWillMount: function () {
    ConversationActions.fetchConversationsRequest( sessionStorage.authenticationToken, this.state.conversationState, this.state.page );
    UserActions.fetchStaffRequest(sessionStorage.authenticationToken);
  },

  componentDidMount: function() {
    var channel = this.props.pusher.subscribe('private-newConversation');
    channel.bind('new_conversation', function(data){
      if (!window.windowHasFocus) window.flashTitle("You have a new conversation", 20);
      if(data.conversation_state === this.state.conversationState){
        if(this.state.conversationState === "escalated" && this.isInConversationList(data.id)) return;
        this.fetchNewConversation(data.id)
      }
    }, this);
  },

  componentWillUnmount: function () {
    this.props.pusher.unsubscribe('private-conversation')
  },

  isInConversationList: function(conversation_id) {
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

  onChangeSelectedStaff: function(staff) {
    ConversationActions.fetchStaffConversation(sessionStorage.authenticationToken, staff, 'escalated');
  },

  onChangeConversationStateTab: function(stateTab) {
    ConversationActions.fetchConversationsRequest(sessionStorage.authenticationToken, stateTab, 1);
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
                        selectedStaff = {this.state.selectedStaff}
          />
        )
      }, this);
    } else {
      var state = this.state.conversationState;
      if (state === parseInt(state, 10)){
        conversations = <div>There is no matching conversation.</div>
      } else {
        conversations = <div className="medium-font-size empty-conversation-container"> There are no more {state} conversations for you to review. Please be sure to review the other sections. </div>;
      }
    }

    var currentSelectedConversation = _.find(this.state.conversations, {id: this.state.selectedConversationId});

    var guardians, patients;
    var conversationListClass = classNames({
      'col-lg-3 conversation-container': true,
      'selected-conversation': this.state.isSelectedConversation,
      'non-selected-conversation': !this.state.isSelectedConversation
    });

    if (currentSelectedConversation) {
      guardians = currentSelectedConversation.guardians;
      patients = currentSelectedConversation.patients;
    }

    return (
      <div>
        <ConversationHeader
          currentListState={this.state.conversationState}
          onChangeConversationStateTab={this.onChangeConversationStateTab}
          staff={this.state.staff}
          selectedStaff={this.state.selectedStaff}
          onChangeSelectedStaff={this.onChangeSelectedStaff}
          clickedConversation={this.state.isSelectedConversation}
        />
        <div className="row">
          <div className ={conversationListClass}>
            <div className="tab-pane fade active in panel panel-default pre-scrollable-left tab-content"
                 id="all-tab"
                 ref="conversationList"
                 onScroll={this.handleScroll}>
              {conversations}
            </div>
          </div>
          <div>
            <MessageNote
              staff={this.state.staff}
              conversation={currentSelectedConversation}
              guardians={guardians}
              patients={patients}
              onClickBack={this.handleClickBack}
              clickedConversation={this.state.isSelectedConversation}
            />
          </div>
        </div>
      </div>
    )
  }
});
