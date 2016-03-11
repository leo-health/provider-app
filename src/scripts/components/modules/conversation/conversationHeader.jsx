var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var UserActions = require('../../../actions/userActions');
var leoUtil = require('../../../utils/common').StringUtils;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedStaff: "All"
    }
  },

  handleClick: function(state) {
    ConversationActions.fetchConversationsRequest(sessionStorage.authenticationToken, state, 1);
  },

  componentWillMount: function() {
    UserActions.fetchStaffRequest(sessionStorage.authenticationToken);
  },

  handleFilterConversation: function(staff) {
    ConversationActions.fetchStaffConversation(sessionStorage.authenticationToken, staff.id, 'escalated')
    this.setState({
      selectedStaff: leoUtil.formatName(staff)
    })
  },

  render: function () {
    var openTab = this.props.currentListState === "open" ? "active" : "";
    var escalationTab = this.props.currentListState === "escalated" ? "active" : "";
    var closeTab = this.props.currentListState === "closed" ? "active" : "";
    var showStaffSelection = escalationTab === "active" ? {display: "inline-block"} : {display: "none"};

    return (
      <div>
        <ul className="nav nav-tabs">
          <li className={openTab} onClick={this.handleClick.bind(this, 'open')}>
            <a href="#open" data-toggle="tab">
              <span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="false"></span> Open
            </a>
          </li>
          <li className={escalationTab} onClick={this.handleClick.bind(this, 'escalated')}>
            <a href="#escalated" data-toggle="tab">
              <span className="glyphicon glyphicon-exclamation-sign-default" aria-hidden="false"></span> Assigned
            </a>
          </li>
          <li className={closeTab} onClick={this.handleClick.bind(this, 'closed')}>
            <a href="#closed" data-toggle="tab">
              <span className="glyphicon glyphicon-ok-circle" aria-hidden="false"></span> Closed
            </a>
          </li>
        </ul>

        <div className="btn-group" id="staff-selection" style={showStaffSelection}>
          <a href="#" className="btn btn-sm btn-default">Assigned to</a>
          <div className="btn-group">
            <a href="#" className="btn btn-sm btn-default">{this.state.selectedStaff}</a>
            <a href="#" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="caret"></span></a>
            <ul className="dropdown-menu">
              {this.props.staff.map(function(staff, i) {
                return (
                    <li key={i}
                        onClick={this.handleFilterConversation.bind(this, staff)}>
                      {leoUtil.formatName(staff)}
                    </li>
                )
              }.bind(this))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
});
