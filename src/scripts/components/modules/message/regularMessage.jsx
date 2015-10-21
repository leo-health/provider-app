var React = require('react');

module.exports = React.createClass({
  componentDidMount: function(){
    if(this.props.reactKey == 0){
      React.findDOMNode(this.refs[this.props.reactKey]).remove();
    }
    if((this.props.count > 1 && this.props.reactKey == 1) || (this.props.closed)){
      var openMessage = React.createElement('span', null, 'Case opened by ' + this.props.sender);
      React.findDOMNode(this.refs[this.props.reactKey]).remove();
      React.render(openMessage, document.getElementById(this.props.reactKey))
    }
    //if(this.props.count == this.props.reactKey){
    //  React.render(<hr/>, document.getElementById(this.props.reactKey + "lower"))
    //}
  },

  render: function() {
    return(
      <div>
        <div className='inline-hr' id={this.props.reactKey}>
          <hr ref={this.props.reactKey}/>
        </div>
        <small> {this.props.sentAt} </small>
        <strong>{this.props.sender}</strong>
        &nbsp;{this.props.messageBody}
        <div className='inline-hr' id={this.props.reactKey + 'lower'}></div>
      </div>
    )
  }
});
