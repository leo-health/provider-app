var React = require('react'),
    Reflux = require('reflux'),
    leoUtil = require('../../../utils/common').StringUtils,
    classNames = require('classnames');

module.exports = React.createClass({
  render: function () {
    var selectedStaffName = this.props.selectedStaff ? leoUtil.formatName(this.props.selectedStaff) : "Anyone";
    var navTabsContainer = classNames({
      'nav nav-tabs tags-container': true,
      'selected-conversation': this.props.clickedConversation
    });
    var showStaffSelectionClass = classNames({
      'btn-group': true,
      'hide-selection': this.props.conversationState === "closed"
    });
    var openTab = classNames({'active': this.props.conversationState !== "closed", "open-case": true});
    var closedTab = classNames({'active': this.props.conversationState === "closed", "closed": true});

    return (
      <div>
        <ul className={navTabsContainer}>
          <li className={openTab} onClick={this.props.onChangeConversationStateTab.bind(null, 'open')}>
            <a href="#open" className="tab-name" data-toggle="tab">
                <span className="heavy-font-size">Open</span>
            </a>
            <div className="open-div"></div>
          </li>
          <li className={closedTab} onClick={this.props.onChangeConversationStateTab.bind(null, 'closed')}>
            <a href="#closed" className="tab-name" data-toggle="tab">
              <span className="heavy-font-size">Closed</span>
            </a>
            <div className="closed-div"></div>
          </li>
          <div className={showStaffSelectionClass} id="staff-selection">
          <li className="assignment-font assigned-to">Assigned to</li>
          <div className="btn-group">
            <li className="assignment-font cursor blue-font" data-toggle="dropdown" aria-expanded="false">{selectedStaffName}</li>
            <ul className="dropdown-menu">
              <li onClick={this.props.onChangeConversationStateTab.bind(null, 'escalated')}>
                <a className="heavy-font-size cursor">Anyone</a>
              </li>
              {this.props.staff.map(function(staff, i) {
                return (
                  <li key={i}
                      className="medium-font-size cursor"
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
