var React = require('react');
var moment = require('moment');
var leoUtil = require('../../../utils/common').StringUtils;
var RegularMessage = require('./regularMessage.jsx');
var SystemMessage = require('./systemMessage.jsx');

module.exports = React.createClass({

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
    var prevType = this.props.prevType;
    var typeName = this.props.typeName;
    sender = leoUtil.formatName(sender);
    if (escalatedTo){
      escalatedTo = leoUtil.formatName(escalatedTo);
    }

    var message;
    switch (messageType){
      case "message":
      case "bot_message":
        message = <RegularMessage sender={sender}
                                  sentAt={sentAt}
                                  messageBody={messageBody}
                                  reactKey={reactKey}
                                  closed={closed}
                                  escalated={escalated}
                                  typeName={typeName}
                                  prevType={prevType}
                                  count={count}/>;
        break;
      case "escalation":
        message = <SystemMessage id={id} escalatedTo={escalatedTo} messageType={messageType} link={this.props.link}/>;
        break;
      case "close":
        message =  <SystemMessage id={id} closedBy={sender} messageType={messageType} link={this.props.link}/>;
        break;
    }

    return(
      <div>
        {message}
      </div>
    )
  }
});
