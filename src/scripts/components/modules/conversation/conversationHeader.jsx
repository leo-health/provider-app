var React = require('react');
var Reflux = require('reflux');
var leoUtil = require('../../../utils/common').StringUtils;

module.exports = React.createClass({
  render: function () {
    var openTabCSSClass = this.props.currentListState === "open" ? "active" : "";
    var escalationTabCSSClass = this.props.currentListState === "escalated" ? "active" : "";
    var closeTabCSSClass = this.props.currentListState === "closed" ? "active" : "";
    var showStaffSelectionStyle = escalationTabCSSClass === "active" ? {display: "inline-block"} : {display: "none"};
    var selectedStaffName = this.props.selectedStaff ? leoUtil.formatName(this.props.selectedStaff) : "Anyone";
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className={openTabCSSClass} onClick={this.props.onChangeConversationStateTab.bind(null, 'open')}>
            <a href="#open" data-toggle="tab">
              <span className="glyphicon glyphicon glyphicon-star-empty" aria-hidden="false"></span>
                <span className="medium-font-size">Open</span>
            </a>
          </li>
          <li className={escalationTabCSSClass} onClick={this.props.onChangeConversationStateTab.bind(null, 'escalated')}>
            <a href="#escalated" data-toggle="tab">
              <span className="glyphicon glyphicon-exclamation-sign-default" aria-hidden="false"></span>
              <span className="medium-font-size">Assigned
              </span>
            </a>
          </li>
          <li className={closeTabCSSClass} onClick={this.props.onChangeConversationStateTab.bind(null, 'closed')}>
            <a href="#closed" data-toggle="tab">
              <span className="glyphicon glyphicon-ok-circle" aria-hidden="false"></span>
              <span className="medium-font-size">Closed</span>
            </a>
          </li>
        </ul>

        <div className="btn-group" id="staff-selection" style={showStaffSelectionStyle}>
          <li className="btn btn-sm btn-default medium-font-size">Assigned to</li>
          <div className="btn-group">
            <li className="btn btn-sm btn-default medium-font-size">{selectedStaffName}</li>
            <li className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
              <span className="caret"></span>
            </li>
            <ul className="dropdown-menu">
              <li onClick={this.props.onChangeConversationStateTab.bind(null, 'escalated')}>
                <a className="heavy-font-size">Anyone</a>
              </li>
              {this.props.staff.map(function(staff, i) {
                return (
                  <li key={i}
                      className="medium-font-size"
                      onClick={this.props.onChangeSelectedStaff.bind(null, staff)}>
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
