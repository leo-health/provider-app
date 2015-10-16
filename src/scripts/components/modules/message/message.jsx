var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  render: function () {
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    sender = sender.title + "." + sender.first_name + " " + sender.last_name;
    var messageType = this.props.messageType;
    var showOpenCase= {display: "none"};
    var seperateLine = <hr/>;
    var messageBody = this.props.body;
    if(messageBody  == "conversation.conversation_closed"){
      "Case Closed By " + {sender}
    }

    if(this.props.previousMessageClosed){
      showOpenCase.display = "block"
    }

    if(this.props.nextMessageFromSystem){
      seperateLine = null
    }

    var displayContent = function(){
      if(messageType == "regularMessage"){
        return(
          <div>
            <div className="inline-hr" style={showOpenCase}>
              <span className="">Case opened by {sender}</span>
            </div>
            <div>
              <small> {sentAt} </small>
              <strong>{sender}</strong>
              {messageBody}
              {seperateLine}
            </div>
          </div>
        )
      }
    };
    return(
      <div>
        <small> {sentAt} </small>
        <strong>{sender}</strong>
        &nbsp;{messageBody}
        <hr/>
      </div>
    )
  }
});

//<div className="inline-hr" style={showOpenCase}>
//  <span className="primary">Case opened by {sender}</span>
//</div>

