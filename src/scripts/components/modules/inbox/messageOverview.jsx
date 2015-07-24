var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
      <a href="" ClassName="list-group-item active">
        <h6 ClassName="list-group-item-heading">Parent 1
          <span ClassName="pull-right">Today, 1:23 PM</span>
        </h6>
        <p>
          <span ClassName="label label-warning">Test Child 1</span>
          <span ClassName="label label-warning">Test Child 2</span>
          <span ClassName="glyphicon glyphicon-exclamation-sign-default pull-right" aria-hidden="true"></span>
        </p>
        <p ClassName="list-group-item-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </a>
    )
  }
});
