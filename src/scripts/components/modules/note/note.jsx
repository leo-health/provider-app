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
      ReactDom.findDOMNode(this).scrollIntoView();
    }
  },

  render: function(){
    var sentAt = moment(this.props.sentAt).calendar() + " ";
    var sender = this.props.sender;
    var note = this.props.note;
    var messageType = this.props.messageType;
    sender = leoUtil.formatName(sender) + " ";
    var style;
    if(this.props.tagName === 'blockquote'){
      if(messageType === "escalation"){
        style = { borderLeft: '#FF6666 5px solid'}
      }else{
        style = { borderLeft: '#21a4f3 5px solid'}
      }
    }

    return(
      <div>
        <this.props.tagName style={style}>
          <small>{sentAt}</small>
          <strong>{sender}</strong>{note}
        </this.props.tagName>
        <hr/>
      </div>
    )
  }
});
