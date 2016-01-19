var React = require('react');
var ReactDom = require('react-dom');

module.exports = React.createClass({
  removeTopLine: function(){
    if(this.props.prevType == 'escalation'){
      ReactDom.findDOMNode(this.refs[this.props.reactKey]).remove();
    }
  },

  addOpenMessage: function(){
    if(this.props.prevType == 'close'){
      ReactDom.findDOMNode(this.refs[this.props.reactKey]).remove();
      var openMessage = React.createElement('span', null, 'Case opened by ' + this.props.sender);
      ReactDom.render(openMessage, document.getElementById(this.props.reactKey))
    }
  },

  componentDidMount: function(){
    if(this.props.sender !== "Leo Bot"){
      this.removeTopLine();
      this.addOpenMessage();
    }
  },

  render: function() {
    var typeName = this.props.typeName;
    var body = this.props.body;
    var message;

    if(typeName === "image"){
      message = <blockquote><a href={body.url} target="blank"><img className="img-chat" src={body.url}/></a></blockquote>
    }else{
      message = body
    }

    return(
      <div>
        <div className='inline-hr' id={this.props.reactKey} ref="container">
          <hr ref={this.props.reactKey}/>
        </div>
        <small> {this.props.sentAt} </small>
        <strong>{this.props.sender}</strong>
        &nbsp;
        {message}
      </div>
    )
  }
});
