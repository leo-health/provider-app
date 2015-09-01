var React = require('react');
var ConversationActions = require('../../../actions/conversationActions');

module.exports = React.createClass({
  fetchConversations: function(){
    ConversationActions.fetchConversationRequest()
  },


  render: function () {
    return (
      <ul className="nav nav-tabs">
        <li className="active">
          <a href="#all-tab" data-toggle="tab">All</a>
        </li>
        <li className="" onClick={this.fetchConversations}>
          <a href="#new-tab" data-toggle="tab"><span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="false"></span> New</a>
        </li>
        <li className="" onClick={this.fetchConversations}>
          <a href="#closed" data-toggle="tab"><span className="glyphicon glyphicon-ok-circle" aria-hidden="false"></span> Closed</a>
        </li>
        <li className="" onClick={this.fetchConversations}>
          <a href="#escalated" data-toggle="tab"><span className="glyphicon glyphicon-exclamation-sign-default" aria-hidden="false"></span> Escalated</a>
        </li>
      </ul>
    )
  }
});
