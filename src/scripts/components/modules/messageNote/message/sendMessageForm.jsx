var React = require('react');
var ReactDom = require('react-dom');
var MessageActions = require('../../../../actions/messageActions');
var NoteActions = require('../../../../actions/noteActions');;

module.exports = React.createClass({
  getInitialState: function(){
    return {message: ''}
  },

  handleMessageChange: function(e){
    this.setState({message: e.target.value});
  },

  handleSendMessage: function(e){
    e.preventDefault();
    if (!this.state.message) return;
    MessageActions.sendMessageRequest(sessionStorage.authenticationToken, this.state.message, "text", this.props.conversation.id);
    this.setState({message: ''})
  },

  render: function(){
    if (!this.props.conversation || this.props.conversation.state !== "closed") {
      var closeButton = <a className="btn btn-primary btn-sm message-button" onClick={this.props.showClose}><span className="glyphicon glyphicon-ok"></span> Close Case</a>;
      var escalateButton = <a className="btn btn-danger btn-sm" onClick={this.props.showEscalation}><span className="glyphicon glyphicon-fire"></span> Assign</a>
    }

    return(
      <div id="message-form">
        <div id="alerts"></div>
        <div className="panel panel-body">
          <form>
            <textarea rows="3"
                      value={this.state.message}
                      onChange={this.handleMessageChange}
                      className="form-control"
                      placeholder="Reply">
            </textarea>
          </form>
        </div>
        <a href="#" className="btn btn-success btn-sm message-button" onClick={this.handleSendMessage}>
          <span className="glyphicon glyphicon-ok"></span> Send
        </a>
        {closeButton}
        {escalateButton}
        <hr/>
      </div>
    )
  }
});
