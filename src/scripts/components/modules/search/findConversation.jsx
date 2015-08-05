var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="panel panel-heading">
        <form className="form-inline">
          <a href="#" className="btn btn-primary btn-sm pull-right"><span className="glyphicon glyphicon-edit"></span> Compose</a>
          <input type="text" className="" placeholder="Search"/>
        </form>
      </div>
    )
  }
});
