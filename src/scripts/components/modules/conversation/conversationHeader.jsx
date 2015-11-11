var React = require('react');
var Reflux = require('reflux');
var classNames = require('classnames');
var ConversationStore = require('../../../stores/conversationStore');
var ConversationActions = require('../../../actions/conversationActions');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ConversationStore, "onStatusChange")],

  onStatusChange: function(status){
    if(status.search){
      this.setState({search: status.search})
    }
  },

  getInitialState: function() {
    return {search: false}
  },

  handleClick: function(state){
    ConversationActions.fetchConversationRequest(localStorage.authenticationToken, state);
  },

  render: function () {
    var isSearch = false;
    if(this.state.search){ }
    var initialTabClass = classNames({
      "": this.state.search,
      "active": !this.state.search
    });
    var navTabClass = classNames({
      "": this.state.search
    });
    return (
      <ul className="nav nav-tabs conversation-header">
        <li className={initialTabClass} onClick={this.handleClick.bind(this, 'open')}>
          <a href="#open" data-toggle="tab">
            <span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="false"></span> Open
          </a>
        </li>
        <li className={navTabClass} onClick={this.handleClick.bind(this, 'escalated')}>
          <a href="#escalated" data-toggle="tab">
            <span className="glyphicon glyphicon-exclamation-sign-default" aria-hidden="false"></span> Escalated
          </a>
        </li>
        <li className={navTabClass} onClick={this.handleClick.bind(this, 'closed')}>
          <a href="#closed" data-toggle="tab">
            <span className="glyphicon glyphicon-ok-circle" aria-hidden="false"></span> Closed
          </a>
        </li>
        <li className={navTabClass} onClick={this.handleClick.bind(this, '')}>
          <a href="#all-tab" data-toggle="tab">All</a>
        </li>
      </ul>
    )
  }
});
