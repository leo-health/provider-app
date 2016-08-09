var React = require('react');
var NoteActions = require('../../../../actions/noteActions');

module.exports = React.createClass({
  handleClick: function(){
    this.props.toggleOpen();
    var highlightNoteKey = this.props.id.toString() + this.props.messageType;
    NoteActions.scrollToNote(highlightNoteKey);
  },

  render: function() {
    var message;
    var tagClass;

    if (this.props.messageType == "escalation"){
      message = "Case was assigned to " + this.props.escalatedTo;
      tagClass = "danger cursor"
    }else{
      message = "Case was closed by " + this.props.closedBy;
      tagClass = "primary cursor"
    }
    return(
      <div className="inline-hr medium-font-size">
        <span className={tagClass} onClick={this.handleClick}>
          {message}
        </span>
      </div>
    )
  }
});
