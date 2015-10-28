var React = require('react');
var NoteActions = require('../../../actions/noteActions');
var ReactDOM = require('react-dom');
var Scroll = require('react-scroll');

module.exports = React.createClass({
  handleClick: function(){
    var highlightNoteKey = this.props.id.toString() + this.props.messageType;
    NoteActions.scrollToNote(highlightNoteKey);
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
        <span className={tagClass} onClick={this.handleClick}>
          {message}
        </span>
      </div>
    )
  }
});


//<a href="#" onClick={this.handleClick}>
//  {message}
//</a>
