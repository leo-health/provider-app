var React = require('react');
var ReactDom = require('react-dom');

module.exports = React.createClass({
  removeTopLine: function(){
    if(this.props.reactKey == 0 || this.props.previousType == 'escalation'){
      ReactDom.findDOMNode(this.refs[this.props.reactKey]).remove();
    }
  },

  addOpenMessage: function(){
    if((this.props.count > 1 && this.props.reactKey == 1) || (this.props.previousType == 'close')){
      ReactDom.findDOMNode(this.refs[this.props.reactKey]).remove();
      var openMessage = React.createElement('span', null, 'Case opened by ' + this.props.sender);
      ReactDom.render(openMessage, document.getElementById(this.props.reactKey))
    }
  },

  componentDidMount: function(){
    this.removeTopLine();
    this.addOpenMessage();
  },

  render: function() {
    return(
      <div>
        <div className='inline-hr' id={this.props.reactKey} ref="container">
          <hr ref={this.props.reactKey}/>
        </div>
        <small> {this.props.sentAt} </small>
        <strong>{this.props.sender}</strong>
        &nbsp;{this.props.messageBody}
      </div>
    )
  }
});
