var React = require('react');
var MessageActions = require('../../../actions/messageActions');
var CloseConversationAlert = require('../alert/closeConversationAlert');
var EscalateMessageAlert = require('../alert/escalateMessageAlert');

module.exports = React.createClass({
  handleSendMessage: function(e){
    e.preventDefault();
    var messageBody=this.refs.message.getDOMNode().value.trim();
    if (!messageBody){
      return
    }
    var typeName="text";
    var currentConversationId=this.props.conversationId;
    MessageActions.sendMessageRequest( localStorage.authenticationToken, messageBody, typeName, currentConversationId);
    this.refs.message.getDOMNode().value="";
    var node = React.findDOMNode(this.props.messageContainer);
  },

  handleCloseConversation: function(e){
    e.preventDefault();
    React.render(<CloseConversationAlert conversationId={this.props.conversationId}/>, document.getElementById('alerts'));
  },

  handleEscalateMessage(e){
    e.preventDefault();
    React.render(<EscalateMessageAlert conversationId={this.props.conversationId} staff={this.props.staff}/>, document.getElementById('alerts'));
  },

  render: function () {
    return (
      <div>
        <div id="alerts"></div>
        <div className="panel panel-body">
          <form>
            <textarea rows="3" className="form-control" placeholder="Reply" ref="message"></textarea>
          </form>
        </div>
        <div className="">
          <form>
            <a href="#" className="btn btn-success btn-sm" onClick={this.handleSendMessage}>
              <span className="glyphicon glyphicon-ok"></span>Send
            </a>
            <a href="#" className="btn btn-primary btn-sm" onClick={this.handleCloseConversation}>
              <span className="glyphicon glyphicon-ok"></span> Close Case
            </a>
            <a href="#" className="btn btn-danger btn-sm" onClick={this.handleEscalateMessage}>
              <span className="glyphicon glyphicon-fire"></span> Escalate
            </a>
          </form>
          <hr/>
        </div>
      </div>
    )
  }
});
