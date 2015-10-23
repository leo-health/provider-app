var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');
var MessageStore = require('../../../stores/messageStore');

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
      debugger
    }
  },

  //componentWillUpdate: function(){
  //  //debugger
  //  //if(this.state && this.state.identity){
  //  //  debugger
  //  //}
  //  var identity = this.props.id + this.props.messageType;
  //  debugger;
  //  React.findDOMNode(this.refs[identity])
  //},

  render: function(){
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    var note = this.props.note;
    sender = sender.title + ". " + sender.first_name + " " + sender.last_name ;
    var identity = this.props.id + this.props.messageType;
    if (identity == this.state.identity){

    }

    return(
      <div ref={identity}>
        <small>{sentAt}</small>
        <strong>{sender}</strong>
        {note}
        <hr/>
      </div>
    )
  }
});




//"animateNoteById('#closed-123', '#notes-container');"

//function animateNoteById(item, container) {
//
//  var itemPositionTop = $(item).position().top;
//  $(container).animate({scrollTop: itemPositionTop});
//  if($(item).parent().is("blockquote"))
//    $(item).unwrap
//  else
//    $(item).wrap("<blockquote></blockquote>");
//}

//"closed-123"
