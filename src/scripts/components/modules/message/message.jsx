var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  render: function () {
    var messageBody = this.props.body;
    var sentAt = moment(this.props.sentAt).calendar();
    var sender = this.props.sender;
    sender = sender.title + "." + sender.first_name + " " + sender.last_name;
    var showOpenCase= {display: "none"};
    if(this.props.previousMessageClosed){
      showOpenCase.display = "block"
    }
    var seperateLine = <hr/>;
    if(this.props.nextMessageFromSystem){
      seperateLine = null
    }

    return(
      <div>
        <div className="inline-hr" style={showOpenCase}>
          <span className="primary">Case opened by {sender}</span>
        </div>
        <div className="checkbox checkbox-circle checkbox-danger">
          <input id="checkbox1" type="checkbox"/>
          <label for="checkbox1">
            <small> {sentAt} </small>
            <strong>{sender}</strong>
            {messageBody}
          </label>
          {seperateLine}
        </div>
      </div>
    )
  }
});


//render: function () {
//  var action = this.props.body;
//  var sender = this.props.sender;
//  sender = sender.title + "." + sender.first_name + " " + sender.last_name;
//  var content;
//  if(action == "conversation.conversation_closed"){
//    content = <span className="Primary">Case Closed By {sender}</span>;
//  }
//  return(
//      <div className="inline-hr">
//        {content}
//      </div>
//  )
//}
