var React = require('react');

module.exports = React.createClass({
  render: function () {
    var showError = this.props.status === "error" ? {display: "block"} : {display: "none"};

    return(
      <div className="alert alert-dismissible alert-danger" style={showError}>
        {this.props.message}
      </div>
    )
  }
});
