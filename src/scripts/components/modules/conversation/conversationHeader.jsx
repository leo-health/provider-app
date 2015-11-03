var React = require('react');
var ConversationActions = require('../../../actions/conversationActions');

module.exports = React.createClass({
  handleClick: function(state){
    ConversationActions.fetchConversationRequest(localStorage.authenticationToken, state);
  },

  render: function () {
    return (
      <ul className="nav nav-tabs">
        <li className="active" onClick={this.handleClick.bind(this, 'open')}>
          <a href="#open" data-toggle="tab">
            <span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="false"></span> Open
          </a>
        </li>
        <li className="" onClick={this.handleClick.bind(this, 'escalated')}>
          <a href="#escalated" data-toggle="tab">
            <span className="glyphicon glyphicon-exclamation-sign-default" aria-hidden="false"></span> Escalated
          </a>
        </li>
        <li className="" onClick={this.handleClick.bind(this, 'closed')}>
          <a href="#closed" data-toggle="tab">
            <span className="glyphicon glyphicon-ok-circle" aria-hidden="false"></span> Closed
          </a>
        </li>
        <li className="" onClick={this.handleClick.bind(this, '')}>
          <a href="#all-tab" data-toggle="tab" onClick={this.handleClick}>All</a>
        </li>
      </ul>
    )
  }
});
