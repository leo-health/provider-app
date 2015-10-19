var React = require('react');

module.exports = React.createClass({
  render: function() {
    var message;
    var tagClass;
    if (this.props.messageType == "escalation"){
      message = "Case escalated to " + this.props.escalatedTo;
      tagClass = "danger"
    }else{
      message = "Case closed by " + this.props.sender;
      tagClass = "primary"
    }

    return(
      <div className="inline-hr">
        <span className={tagClass}>{message}</span>
      </div>
    )
  }
});
