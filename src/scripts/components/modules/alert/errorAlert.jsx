var React = require('react');

module.exports = React.createClass({
  render: function () {
    var showError = this.props.status === "error" ? {display: "block"} : {display: "none"};

    return(
      <div className="alert alert-dismissible alert-danger" style={showError}>
        <button type="button" className="close" data-dismiss="alert">×</button>
        {this.props.message}
      </div>
    )
  }
});
