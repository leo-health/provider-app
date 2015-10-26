var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');
var MessageStore = require('../../../stores/messageStore');
var ReactDOM = require('react-dom');
var Scroll = require('react-scroll');


module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(MessageStore, 'onStatusChange')
  ],

  getInitialState: function(){
    return { identity: this.props.initialIdentity }
  },

  onStatusChange: function(status){
    if(status.identity){
      this.setState(status);
    }
  },

  render: function(){
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    var note = this.props.note;
    var element = this.props.element;
    sender = sender.title + ". " + sender.first_name + " " + sender.last_name ;
    var noteTarget = this.props.id.toString() + this.props.messageType
    return(
      <div>
        <element name={noteTarget} className="element">
          <small>{sentAt}</small>
          <strong>{sender}</strong>{note}
          <hr/>
        </element>
      </div>
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
