var React = require('react');

module.exports = React.createClass({
  render: function () {
    var staff = this.props.staff;
    staff = staff.title + '. ' + staff.first_name + ' ' + staff.last_name;
    return (
      <option>{staff}</option>
    )
  }
});
