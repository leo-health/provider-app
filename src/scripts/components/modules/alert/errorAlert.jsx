var React = require('react');

module.exports = React.createClass({
  showError: function(){
    return this.props.status === "error" ? {display: "block"} : {display: "none"};
  },

  render: function () {
    return(
      <div className="alert alert-dismissible alert-danger" style={this.showError()}>
        {this.props.message}
      </div>
    )
  }
});
