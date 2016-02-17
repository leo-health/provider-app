var React = require('react');
var leoUtil = require('../../../utils/common').StringUtils;

module.exports = React.createClass({
  render: function () {
    var staff = this.props.staff;
    var staffId = this.props.staff.id;
    staff = leoUtil.formatName(staff);

    return (
      <option value={staffId}>{staff}</option>
    )
  }
});
