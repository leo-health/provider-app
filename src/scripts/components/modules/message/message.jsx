var React = require('react');
var moment = require('moment');
var RegularMessage = require('./regularMessage.jsx');
var SystemMessage = require('./systemMessage.jsx');

module.exports = React.createClass({
  render: function () {
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    var messageType = this.props.messageType;
    var messageBody = this.props.body;
    var escalatedTo = this.props.escalatedTo;
    sender = sender.title + ". " + sender.first_name + " " + sender.last_name;

    if (escalatedTo){
      escalatedTo = escalatedTo.title + ". " + escalatedTo.first_name + " " + escalatedTo.last_name;
    }

    var message;
    switch (messageType){
      case "message":
        message = <RegularMessage sender={sender} sentAt={sentAt} messageBody={messageBody}/>;
        break;
      case "escalation":
        message = <SystemMessage escalatedTo={escalatedTo} messageType={messageType}/>;
        break;
      case "close":
        message =  <SystemMessage closedBy={sender} messageType={messageType}/>;
        break;
    }

    return(
      <div>
        {message}
      </div>
    )
  }
});
