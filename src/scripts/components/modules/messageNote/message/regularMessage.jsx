var React = require('react');
var ReactDom = require('react-dom');

module.exports = React.createClass({
  render: function() {
    var typeName = this.props.typeName;
    var body = this.props.body;
    var message;
    var topLine;

    if(typeName === "image"){
      message = <blockquote><a href={body.full_size_image_url} target="blank"><div className="img-wrapper"><span className="img-helper"></span><img className="img-chat" src={body.web_app_image_url}/></div></a></blockquote>
    }else{
      message = body
    }

    if(this.props.prevType != 'escalation' && this.props.prevType != 'close'){
      topLine = <div className='inline-hr' id={this.props.reactKey}><hr ref={this.props.reactKey}/></div>
    }

    return(
      <div>
        {topLine}
        <small className='medium-font-size'> {this.props.sentAt} </small>
        <strong className='heavy-font-size'>{this.props.sender}</strong>
        &nbsp;
        <small className='medium-font-size'> {message} </small>
      </div>
    )
  }
});
