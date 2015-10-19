var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');

module.exports = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    ConversationActions.closeConversationRequest(localStorage.authenticationToken, this.props.conversationId);
    React.findDOMNode(this).remove();
  },

  render: function () {
    return(
      <div id="close-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" data-dismiss="alert">×</button>
        <form className="form alert-form">
          <div className="form-group">
            <label htmlFor="close-notes" className="control-label">Please enter any relevant notes to explain how the case was resolved.</label>
            <textarea id="close-notes" className="form-control" rows="1" type="text"></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-sm form"><span className="glyphicon glyphicon-ok"></span> Close Case</button>
        </form>
      </div>
    )
  }
});
