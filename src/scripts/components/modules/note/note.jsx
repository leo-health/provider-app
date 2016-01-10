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
    sender = leoUtil.formatName(sender) + " ";

    return(
      <div>
        <this.props.tagName>
          <small>{sentAt}</small>
          <strong>{sender}</strong>{note}
        </this.props.tagName>
        <hr/>
      </div>
    )
  }
});
