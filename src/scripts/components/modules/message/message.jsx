var React = require('react');
var moment = require('moment');
var RegularMessage = require('./regularMessage.jsx');
var SystemMessage = require('./systemMessage.jsx');

module.exports = React.createClass({
  //componentWillMount: function () {
  //  debugger
  //},

  render: function () {
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    var messageType = this.props.messageType;
    var messageBody = this.props.body;
    var escalatedTo = this.props.escalatedTo;
    var reactKey = this.props.reactKey;
    var id = this.props.id;
    var count = this.props.count;
    var closed = this.props.closed;
    var escalated = this.props.escalated;
    var previousType = this.props.previousType;
    sender = sender.title + ". " + sender.first_name + " " + sender.last_name;

    if (escalatedTo){
      escalatedTo = escalatedTo.title + ". " + escalatedTo.first_name + " " + escalatedTo.last_name;
    }

    var message;
    switch (messageType){
      case "message":
        message = <RegularMessage sender={sender}
                                  sentAt={sentAt}
                                  messageBody={messageBody}
                                  reactKey={reactKey}
                                  closed={closed}
                                  escalated={escalated}
                                  previousType={previousType}
                                  count={count}/>;
        break;
      case "escalation":
        message = <SystemMessage id={id} escalatedTo={escalatedTo} messageType={messageType}/>;
        break;
      case "close":
        message =  <SystemMessage id={id} closedBy={sender} messageType={messageType}/>;
        break;
    }

    return(
      <div>
        {message}
      </div>
    )
  }
});
