var React = require('react');

module.exports = React.createClass({
  render: function () {
    var staff = this.props.staff;
    var staffId = this.props.staff.id;
    staff = staff.title + ". " + staff.first_name + " " + staff.last_name;
    return (
      <option value={staffId}>{staff}</option>
    )
  }
});
