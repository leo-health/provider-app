var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <div className="panel panel-body">
          <form>
            <textarea rows="3" className="form-control" placeholder="Reply"></textarea>
          </form>
        </div>
        <div className="">
          <form>
            <a href="#" className="btn btn-success btn-sm"><span className="glyphicon glyphicon-ok"></span> Send</a>
            <a href="#" className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-ok"></span> Close Case</a>
            <a href="#" className="btn btn-danger btn-sm"><span className="glyphicon glyphicon-fire"></span> Escalate</a>
          </form>
        </div>
      </div>
    )
  }
});
