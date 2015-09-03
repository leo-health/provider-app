var React = require('react');
var ConversationActions = require('../../../actions/conversationActions');

module.exports = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    ConversationActions.closeConversationRequest(localStorage.authenticationToken, this.props.conversationId)
  },

  render: function () {
    return(
      <div id="escalation-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" data-dismiss="alert">×</button>
        Are you sure you want to close this case? &nbsp;
        <button type="submit" className="btn btn-primary btn-sm form" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-ok"></span> Close Case
        </button>
      </div>
    )
  }
});
