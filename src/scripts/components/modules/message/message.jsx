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
      }else{
        return(
          <div className="inline-hr">
            <span className="Primary">{messageBody}</span>
          </div>
        )
      }
    };
    return(
     <div>
       {displayContent()}
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
