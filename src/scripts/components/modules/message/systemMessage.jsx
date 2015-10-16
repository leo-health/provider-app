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

    //<div class="inline-hr">
    //  <span class="">Case opened by Ben</span>
    //</div>

    return(
      <div className="inline-hr">
        <span className={tagClass}>{message}</span>
      </div>
    )
  }
});
