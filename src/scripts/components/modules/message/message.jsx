var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  render: function () {
    var messageBody = this.props.body;
    var sentAt = moment(this.props.sentAt).calendar();
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
        </div>
      </div>
    )
  }
});
