var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
      <a href="" className="list-group-item active">
        <h6 className="list-group-item-heading">Parent 1
          <span className="pull-right">Today, 1:23 PM</span>
        </h6>
        <p>
          <span className="label label-warning">Test Child 1</span>
          <span className="label label-warning">Test Child 2</span>
          <span className="glyphicon glyphicon-exclamation-sign-default pull-right" aria-hidden="true"></span>
        </p>
        <p className="list-group-item-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </a>
    )
  }
});
