var React = require('react');
var Reflux = require('reflux');
var leoUtil = require('../../../utils/common').StringUtils;

module.exports = React.createClass({
  render: function () {
    var openTabCSSClass = this.props.currentListState === "open" ? "active-open open-case" : "inactive-open open-case";
    var escalationTabCSSClass = this.props.currentListState === "escalated" ? "active-escalated escalated" : "inactive-escalated escalated";
    var closeTabCSSClass = this.props.currentListState === "closed" ? "active-closed closed" : "inactive-closed closed";
    var showStaffSelectionStyle = escalationTabCSSClass === "active-escalated escalated" ? {display: "inline-block"} : {display: "none"};
    var selectedStaffName = this.props.selectedStaff ? leoUtil.formatName(this.props.selectedStaff) : "Anyone";
    return (
      <div>
        <ul className="nav nav-tabs tags-container">
          <li className={openTabCSSClass} onClick={this.props.onChangeConversationStateTab.bind(null, 'open')}>
            <a href="#open" className="tab-name" data-toggle="tab">
                <span className="heavy-font-size">Open</span>
            </a>
            <div className="open-div"></div>
          </li>
          <li className={escalationTabCSSClass} onClick={this.props.onChangeConversationStateTab.bind(null, 'escalated')}>
            <a href="#escalated" className="tab-name" data-toggle="tab">
              <span className="heavy-font-size">Assigned
              </span>
            </a>
            <div className="escalated-div"></div>
          </li>
          <li className={closeTabCSSClass} onClick={this.props.onChangeConversationStateTab.bind(null, 'closed')}>
            <a href="#closed" className="tab-name" data-toggle="tab">
              <span className="heavy-font-size">Closed</span>
            </a>
            <div className="closed-div"></div>
          </li>
          <div className="btn-group" id="staff-selection" style={showStaffSelectionStyle}>
          <li className="btn btn-sm btn-default assignment-font">Assigned to</li>
          <div className="btn-group">
            <li className="btn btn-sm btn-default assignment-font">{selectedStaffName}</li>
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
        </ul>
      </div>
    )
  }
});
