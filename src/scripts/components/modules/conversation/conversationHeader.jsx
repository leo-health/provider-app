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
    ConversationActions.fetchConversationsRequest(sessionStorage.authenticationToken, state, 1);
  },

  render: function () {
    var isSearch = false;
    var initialTabClass = classNames({
      "": this.state.search,
      "active": !this.state.search
    });

    var navTabClass = classNames({
      "": this.state.search
    });

    return (
      <div>
        <ul className="nav nav-tabs">
          <li className={initialTabClass} onClick={this.handleClick.bind(this, 'open')}>
            <a href="#open" data-toggle="tab">
              <span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="false"></span> Open
            </a>
          </li>
          <li className={navTabClass} onClick={this.handleClick.bind(this, 'escalated')}>
            <a href="#escalated" data-toggle="tab">
              <span className="glyphicon glyphicon-exclamation-sign-default" aria-hidden="false"></span> Assigned
            </a>
          </li>
          <li className={navTabClass} onClick={this.handleClick.bind(this, 'closed')}>
            <a href="#closed" data-toggle="tab">
              <span className="glyphicon glyphicon-ok-circle" aria-hidden="false"></span> Closed
            </a>
          </li>
        </ul>

        <div className="btn-group" id="staff-selection">
          <a href="#" className="btn btn-sm btn-default">Assigned to</a>
          <div className="btn-group">
            <a href="#" className="btn btn-sm btn-default">Erin Hannah Gold PNP</a>
            <a href="#" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Staff 1</a></li>
              <li><a href="#">Staff 2</a></li>
              <li><a href="#">Staff 3</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});
