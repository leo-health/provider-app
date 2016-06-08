var React = require('react'),
    ReactDom = require('react-dom'),
    MessageActions = require('../../../../actions/messageActions'),
    SendMessageForm = require('./sendMessageForm'),
    ClosureForm = require('./closureForm'),
    EscalationForm = require('./escalationForm'),
    NoteActions = require('../../../../actions/noteActions');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      escalatedToId: 0,
      priority: 0,
      action: "message"
    }
  },

  handleEscalate: function (e) {
    e.preventDefault();
    var note = ReactDom.findDOMNode(this.refs.escalationNote).value.trim();
    var conversationId = this.props.conversation.id;
    var escalatedToId = this.state.escalatedToId;
    var priority = this.state.priority;
    NoteActions.createEscalateNoteRequest( sessionStorage.authenticationToken, conversationId, escalatedToId, note, priority );
    this.setState({action: "message"});
    ReactDom.findDOMNode(this.refs.escalationNote).value = "";
  },

  showClose: function() {
    this.setState({ action: "close" })
  },

  showEscalation: function() {
    this.setState({ action: "escalate" })
  },

  showMessage: function() {
    this.setState({ action: "message" })
  },

  setPriority: function(e){
    this.setState({ priority: e.target.value})
  },

  formSelection: function(){
    var page;
    switch(this.state.action){
      case 'escalate':
        page = <EscalationForm/>;
        break;
      case 'close':
        page = <ClosureForm conversation={this.props.conversation}
                            showMessage={this.showMessage}/>;
        break;
      default:
        page = <SendMessageForm conversation={this.props.conversation}
                                showClose={this.showClose}
                                showEscalatio={this.showEscalation}/>;
        break;
    }
    return page;
  },

  render: function () {
    return (
      <div>
        {this.formSelection()}
      </div>
    )
  }
});
