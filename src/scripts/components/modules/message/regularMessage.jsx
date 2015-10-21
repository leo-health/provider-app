var React = require('react');

module.exports = React.createClass({
  componentDidMount: function(){
    if(this.props.reactKey == 0){
      React.findDOMNode(this.refs.line).remove();
    }
  },

  render: function() {
    return(
        <div>
          <hr ref='line'/>
          <small> {this.props.sentAt} </small>
          <strong>{this.props.sender}</strong>
          &nbsp;{this.props.messageBody}
        </div>
    )
  }
});
