var React = require('react');
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  handleClick: function(){
    var identity = this.props.id + this.props.messageType;
    MessageActions.scrollToNote(identity);
  },

  render: function() {
    var message;
    var tagClass;
    if (this.props.messageType == "escalation"){
      message = "Case escalated to " + this.props.escalatedTo;
      tagClass = "danger"
    }else{
      message = "Case closed by " + this.props.closedBy;
      tagClass = "primary"
    }

    return(
      <div className="inline-hr">
        <span className={tagClass}>
          <a href="#" onClick={this.handleClick}>
            {message}
          </a>
        </span>
      </div>
    )
  }
});
