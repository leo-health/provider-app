var React = require('react');
var NoteActions = require('../../../actions/noteActions');

module.exports = React.createClass({
  handleClick: function(){
    var highlightNoteKey = this.props.id.toString() + this.props.messageType;
    NoteActions.scrollToNote(highlightNoteKey);
  },

  render: function() {
    var message;
    var tagClass;

    if (this.props.messageType == "escalation"){
      message = "Case was escalated to " + this.props.escalatedTo;
      tagClass = "danger"
    }else{
      message = "Case was closed by " + this.props.closedBy;
      tagClass = "primary"
    }
    return(
      <div className="inline-hr">
        <span className={tagClass} onClick={this.handleClick}>
          {message}
        </span>
      </div>
    )
  }
});
