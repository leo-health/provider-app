var React = require('react');
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    var messageBody=this.refs.message.getDOMNode().value.trim();
    if (!messageBody){
      return
    }
    var messageType="text";
    var currentConversationId=this.props.conversationId;
    MessageActions.sendMessageRequest( localStorage.authenticationToken, messageBody, messageType, currentConversationId)
  },

  render: function () {
    return (
      <div>
        <div className="panel panel-body">
          <form>
            <textarea rows="3" className="form-control" placeholder="Reply" ref="message"></textarea>
          </form>
        </div>
        <div className="">
          <form>
            <a href="#" className="btn btn-success btn-sm" onClick={this.handleClick}>
              <span className="glyphicon glyphicon-ok"></span>Send
            </a>
            <a href="#" className="btn btn-primary btn-sm">
              <span className="glyphicon glyphicon-ok"></span> Close Case
            </a>
            <a href="#" className="btn btn-danger btn-sm">
              <span className="glyphicon glyphicon-fire"></span> Escalate
            </a>
          </form>
        </div>
      </div>
    )
  }
});
