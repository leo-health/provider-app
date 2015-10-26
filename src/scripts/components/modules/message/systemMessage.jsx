var React = require('react');
var MessageActions = require('../../../actions/messageActions');
var ReactDOM = require('react-dom');
var Scroll = require('react-scroll');

module.exports = React.createClass({
  handleClick: function(){
    var noteTarget = this.props.id + this.props.messageType;
    MessageActions.scrollToNote(noteTarget);
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
    var noteTarget = this.props.id.toString() + this.props.messageType;
    var link = this.props.link;
    return(
      <div className="inline-hr">
        <link to={noteTarget} spy={true} smooth={true} duration={500}>
          <span className={tagClass}>
            {message}
          </span>
        </link>
      </div>
    )
  }
});


//<a href="#" onClick={this.handleClick}>
//  {message}
//</a>
