var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var ConversationStore = require('../../../stores/conversationStore');
var ConversationHeader = require('./conversationHeader');
var Conversation = require('./conversation');

module.exports = React.createClass({
  //mixins: [Reflux.listenTo(ConversationStore, "onStatusChange")],
  mixins: [Reflux.connect(ConversationStore, "conversations")],
  //getInitialState: function(){
  //
  //},

  //componentDidMount: function() {
  //  $.get(this.props.source, function(result) {
  //    var lastGist = result[0];
  //    if (this.isMounted()) {
  //      this.setState({
  //        username: lastGist.owner.login,
  //        lastGistUrl: lastGist.html_url
  //      });
  //    }
  //  }.bind(this));
  //  var conversation_params = { authentication_token: localStorage.authentication_token };
  //  ConversationActions.fetchConversationRequest(conversation_params)
  //},

  onStatusChange: function (status) {
    this.setState(status);
  },

  render: function () {
    var conversations = this.state.conversations
    debugger
    return (
      <div>
        <ConversationHeader/>
        <div id="content" className="tab-content">
          <div className="tab-pane fade active in" id="all-tab">
            <div className="panel panel-default pre-scrollable-left">
              <Conversation/>
            </div>
          </div>
        </div>
      </div>
    )
  }      
});
