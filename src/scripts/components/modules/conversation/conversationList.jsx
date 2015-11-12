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
    return { selectedConversation: 0, isInfiniteLoading: false, conversationState: 'open'}
  },

  onStatusChange: function(status){
    if(status.conversationState && status.conversationState != this.state.conversationState){
      this.setState({conversationState: status.conversationState})
    }
  },

  handleOnClick: function(i, conversationId){
    this.setState({selectedConversation: i});
    MessageActions.fetchMessagesRequest(localStorage.authenticationToken, conversationId);
  },


  componentWillReceiveProps: function(){
    this.setState({selectedConversation: 0});
  },

  elementInfiniteLoad: function() {
    return( <div className="infinite-list-item">
             Loading...
            </div>)
  },

  handleInfiniteLoad: function () {
    ConversationActions.fetchConversationRequest(localStorage.authenticationToken,
                                                 this.state.conversationState)
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
                        patients = {conversation.patients}
                        createdAt = {conversation.last_message_created_at }
                        conversationState = {conversation.state}
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
                    onInfiniteLoad={this.handleInfiniteLoad} //comunicate to api here
                    loadingSpinnerDelegate={this.elementInfiniteLoad} //this is the spinner
                    isInfiniteLoading={this.state.isInfiniteLoading} //descide if spinner is showing
                    useWindowAsScrollContainer>
            {conversations}
          </Infinite>
        </div>
      </div>
    )
  }
});
