var React = require('react');

module.exports = React.createClass({
  render: function () {
    var action = this.props.body;
    var sender = this.props.sender;
    sender = sender.title + "." + sender.first_name + " " + sender.last_name;
    var content;
    if(action == "conversation.conversation_closed"){
      content = <span className="Primary">Case Closed By {sender}</span>;
    }
    return(
      <div className="inline-hr">
        {content}
      </div>
    )
  }
});
