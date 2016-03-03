var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var moment = require('moment');
var leoUtil = require('../../../utils/common').StringUtils;

module.exports = React.createClass({
  componentDidUpdate: function(prevProps){
    this.ensueVisible();
  },

  ensueVisible: function(){
    if(this.props.tagName === 'blockquote'){
      this.props.scrollIntoView(ReactDom.findDOMNode(this));
    }
  },

  render: function(){
    var sentAt = moment(this.props.sentAt).calendar() + " ";
    var sender = this.props.sender;
    var note = this.props.note;
    var messageType = this.props.messageType;
    var escalatedTo = this.props.escalatedTo;

    var currentUser;
    if(sessionStorage.user) {
      currentUser = JSON.parse(sessionStorage.user);
      if (currentUser.id == sender.id) {
        // You closed this case
        sender = "You"
      }
    } else {
      // X closed this case
      sender = leoUtil.formatName(sender);
    }

    var noteDisplayString;
    if (messageType === "close") {

      noteDisplayString = `${sentAt} - ${sender} closed this case`;
    } else if (messageType == "escalation" && escalatedTo) {

      if (currentUser && currentUser.id === escalatedTo.id) {
          if (sender.id === escalatedTo.id) {
            // You assigned this case to yourself
            escalatedTo = "yourself";
          } else {
            // X assigned this case to you
            escalatedTo = "you";
          }
      } else {
          // X assigned this case to Y
          escalatedTo = leoUtil.formatName(escalatedTo);
      }
      noteDisplayString = `${sentAt} - ${sender} assigned this case to ${escalatedTo}`

    } else {

      // default for other messageTypes if needed
      noteDisplayString = sentAt;
    }

    var style;
    if(this.props.tagName === 'blockquote'){
      if(messageType === "escalation"){
        style = { borderLeft: '#FF6666 5px solid'}
      }else{
        style = { borderLeft: '#21a4f3 5px solid'}
      }
      return(
        <div>
          <this.props.tagName style={style}>
            <small>{noteDisplayString}</small>
            <strong>{sender} </strong>{note}
          </this.props.tagName>
          <hr/>
        </div>
      )
    }

    return(
      <div>
        <this.props.tagName style={style}>
          <small>{noteDisplayString}</small>
          <br></br>
          <strong>{sender} </strong>{note}
        </this.props.tagName>
        <hr/>
      </div>
    )
  }
});
