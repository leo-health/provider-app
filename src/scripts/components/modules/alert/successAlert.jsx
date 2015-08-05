var React = require('react');

module.exports = React.createClass({
  render: function () {
    var showSuccess = {display: "none"};
    if (this.props.status == "ok"){
      showSuccess.display = "block"
    }else{
      showSuccess.display = "none";
    }

    return(
      <div className="alert alert-dismissible alert-success" style={showSuccess}>
        <button type="button" className="close" data-dismiss="alert">×</button>
        {this.props.message}
      </div>
    )
  }
});
