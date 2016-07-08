var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var moment = require('moment');
var leoUtil = require('../../../../utils/common').StringUtils;

module.exports = React.createClass({
  render: function(){
    var sentAt = moment(this.props.sentAt).format('MMMM Do YYYY, h:mm:ss a') + " ";
    var sender = this.props.sender;
    var note = this.props.note;
    var messageType = this.props.messageType;
    var escalatedTo = this.props.escalatedTo;
    var currentUser;

    if(sessionStorage.user) {
      currentUser = JSON.parse(sessionStorage.user);
      sender = currentUser.id == sender.id ? "You" : leoUtil.formatName(sender)
    }

    var noteDisplayString;
    switch (messageType) {
      case "close":
        noteDisplayString = `${sentAt} - ${sender} closed this case`;
        break;
      case "escalation":
        if (currentUser && escalatedTo && currentUser.id === escalatedTo.id) {
          escalatedTo = this.props.sender.id === escalatedTo.id ? "yourself" : "you";
        } else {
          escalatedTo = leoUtil.formatName(escalatedTo);
        }
        noteDisplayString = `${sentAt} - ${sender} assigned this case to ${escalatedTo}`
        break;
      default:
        noteDisplayString = sentAt;
        break;
    }

    var optionalBreak;
    var style;
    if(this.props.tagName === 'blockquote'){
      var color = messageType === "escalation" ? "#FF6666" : "#21a4f3";
      style = { borderLeft: `${color} 5px solid`}
    } else {
      optionalBreak = <br></br>
    }

    var optionalSender = note && note.length>0 ? <strong>{sender} </strong> : null;

    return(
      <div>
        <this.props.tagName style={style}>
          <small className="medium-font-size dark-gray-font">{noteDisplayString}</small>
          {optionalBreak}
          {optionalSender}
          {note}
        </this.props.tagName>
        <hr/>
      </div>
    )
  }
});
