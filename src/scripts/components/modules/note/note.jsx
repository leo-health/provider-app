var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  render: function(){
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    var note = this.props.note;
    sender = sender.title + ". " + sender.first_name + " " + sender.last_name ;

    return(
      <div>
        <small>{sentAt}</small>
        <strong>{sender}</strong>
        {note}
        <hr/>
      </div>
    )
  }
});
