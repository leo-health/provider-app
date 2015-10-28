var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');

module.exports = React.createClass({
  render: function(){
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    var note = this.props.note;
    sender = sender.title + ". " + sender.first_name + " " + sender.last_name ;
    return(
      <this.props.tagName>
        <small>{sentAt}</small>
        <strong>{sender}</strong>{note}
        <hr/>
      </this.props.tagName>
    )
  }
});

//function animateNoteById(item, container) {
//
//  var itemPositionTop = $(item).position().top;
//  $(container).animate({scrollTop: itemPositionTop});
//  if($(item).parent().is("blockquote"))
//    $(item).unwrap
//  else
//    $(item).wrap("<blockquote></blockquote>");
//}
