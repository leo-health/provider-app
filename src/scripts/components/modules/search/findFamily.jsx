var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="panel panel-heading">
        <form className="form">
          <input type="text" className="form-control" placeholder="Find family"/>
        </form>
      </div>
    )
  }
});
