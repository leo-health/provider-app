var React = require('react');
var Reflux = require('reflux');
var HomeHeader = require('./homeHeader');
var ConversationActions = require('../../actions/conversationActions');
var ConversationStore = require('../../stores/conversationStore');
var FindFamily = require('../modules/search/findFamily');
var ConversationList = require('../modules/conversation/conversationList');
var ConversationHeader = require('../modules/conversation/conversationHeader');
var MessageList = require('../modules/message/messageList');
var NoteList = require('../modules/note/noteList');
var Footer = require('./footer');
var ReactDOM = require('react-dom');
var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ConversationStore, "onStatusChange")],

  getInitialState: function () {
    return {}
  },

  componentWillMount: function(){
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.stateChanel = this.pusher.subscribe('newState' + localStorage.email);
    this.messageChanel = this.pusher.subscribe('newMessage' + localStorage.email);
  },

  componentDidMount: function(){
    ConversationActions.fetchConversationRequest(localStorage.authenticationToken, "open");
  },

  onStatusChange: function (status) {
    this.setState(status)
  },

  render: function() {
    var conversations = this.state.conversations;

    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-3">
              <FindFamily/>
              <ConversationHeader/>
            </div>
          </div>
          <div className="row">
            <div id="left" className="col-lg-3">
              <ConversationList stateChanel={this.stateChanel} conversations={conversations}/>
            </div>
            <div id="middle" className="col-lg-6">
              <MessageList messageChanel={this.messageChanel} stateChanel={this.stateChanel} link={Link}/>
            </div>
            <div id="right" className="col-lg-3">
              <NoteList stateChanel={this.stateChanel} element={Element}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
});
