var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
        <div>
          <small> {this.props.sentAt} </small>
          <strong>{this.props.sender}</strong>
          &nbsp;{this.props.messageBody}
          <hr/>
        </div>
    )
  }
});
