var React = require('react');
var moment = require('moment');
var leoUtil = require('../../../../utils/common').StringUtils;
var RegularMessage = require('./regularMessage.jsx');
var SystemMessage = require('./systemMessage.jsx');

module.exports = React.createClass({
  render: function () {
    var sentAt;
    var sentTime = this.props.sentAt;
    if (moment(sentTime).isSame(moment(), 'day')) {
      sentAt = "Today," + moment(sentTime).format(' h:mm a');
    } else if (moment(sentTime).isSame(moment().subtract(1, 'days'), 'day')) {
      sentAt = "Yesterday," + moment(sentTime).format(' h:mm a');
    } else if (moment(sentTime).isSame(moment(), 'year')) {
      sentAt = moment(this.props.sentAt).format('MMMM D, h:mm a');
    }
    else {
      sentAt = moment(this.props.sentAt).format('MMMM D YYYY, h:mm a');
    }
    var sender = this.props.sender;
    var messageType = this.props.messageType;
    var body = this.props.body;
    var escalatedTo = this.props.escalatedTo;
    var reactKey = this.props.reactKey;
    var id = this.props.id;
    var prevType = this.props.prevType;
    var typeName = this.props.typeName;
    sender = leoUtil.formatName(sender);
    if (escalatedTo) escalatedTo = leoUtil.formatName(escalatedTo);
    switch (messageType){
      case "message":
        message = <RegularMessage sender={sender}
                                  sentAt={sentAt}
                                  body={body}
                                  reactKey={reactKey}
                                  typeName={typeName}
                                  prevType={prevType}
                  />;
        break;
      case "bot_message":
        message = <RegularMessage sender={"Leo"}
                                  sentAt={sentAt}
                                  body={body}
                                  reactKey={reactKey}
                                  typeName={typeName}
                                  prevType={prevType}
                  />;

        break;
      case "escalation":
        message = <SystemMessage id={id}
                                 sentAt={sentAt}
                                 escalatedTo={escalatedTo}
                                 messageType={messageType}
                                 link={this.props.link}/>;
        break;
      case "close":
        message =  <SystemMessage id={id}
                                  sentAt={sentAt}
                                  closedBy={sender}
                                  messageType={messageType}
                                  link={this.props.link}/>;
        break;
    }

    var message;
    return(
      <div className="message-cell medium-font-size">
        {message}
      </div>
    )
  }
});
