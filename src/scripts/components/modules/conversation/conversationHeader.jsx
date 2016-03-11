var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var UserActions = require('../../../actions/userActions');
var leoUtil = require('../../../utils/common').StringUtils;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      selectedStaff: "Anyone"
    }
  },

  handleClick: function(state) {
    ConversationActions.fetchConversationsRequest(sessionStorage.authenticationToken, state, 1);
    this.setState({
      selectedStaff: "Anyone"
    })
  },

  componentWillMount: function() {
    UserActions.fetchStaffRequest(sessionStorage.authenticationToken);
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.currentListState === 'open' ||nextProps.currentListState === 'closed'){
      this.setState({selectedStaff: "Anyone"})
    }
  },

  handleFilterConversation: function(staff) {
    ConversationActions.fetchStaffConversation(sessionStorage.authenticationToken, staff.id, 'escalated');
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
          <li className="btn btn-sm btn-default">Assigned to</li>
          <div className="btn-group">
            <li className="btn btn-sm btn-default">{this.state.selectedStaff}</li>
            <li className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span className="caret"></span>
            </li>
            <ul className="dropdown-menu">
              <li onClick={this.handleClick.bind(this, 'escalated')}>
                <a>Anyone</a>
              </li>
              {this.props.staff.map(function(staff, i) {
                return (
                  <li key={i}
                      onClick={this.handleFilterConversation.bind(this, staff)}>
                    <a>{leoUtil.formatName(staff)}</a>
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
