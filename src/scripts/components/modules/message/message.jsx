var React = require('react');

module.exports = React.createClass({
  render: function () {
    var messageBody = this.props.body;
    var sentAt = this.props.sentAt;
    var sender = this.props.sender;
    sender = sender.title + "." + sender.first_name + " " + sender.last_name;

    return(
      <div>
        <div className="checkbox checkbox-circle checkbox-danger">
          <input id="checkbox1" type="checkbox"/>
          <label for="checkbox1">
            <small> {sentAt} </small>
            <strong>{sender}</strong>
            {messageBody}
          </label>
          <hr/>
        </div>
      </div>
    )
  }
});
