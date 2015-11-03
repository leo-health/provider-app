var React = require('react');

module.exports = React.createClass({
  render: function () {
    var showError = {display: "block"};
    if (this.props.status == "error"){
      showError.display = "block"
    }else{
      showError.display = "none";
    }

    return(
      <div className="alert alert-dismissible alert-danger" style={showError}>
        <button type="button" className="close" data-dismiss="alert">×</button>
        {this.props.message}
      </div>
    )
  }
});
