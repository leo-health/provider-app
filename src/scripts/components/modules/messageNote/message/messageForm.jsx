var React = require('react');
var ReactDom = require('react-dom');
var MessageActions = require('../../../../actions/messageActions');
var NoteActions = require('../../../../actions/noteActions');
var MessageStaff = require('../message/messageStaff');

module.exports = React.createClass({
  handleSendMessage: function(e){
    e.preventDefault();
    var messageBody= ReactDom.findDOMNode(this.refs.message).value.trim();
    if (!messageBody) return;
    var typeName="text";
    var currentConversationId=this.props.conversation.id;
    MessageActions.sendMessageRequest( sessionStorage.authenticationToken, messageBody, typeName, currentConversationId);
    ReactDom.findDOMNode(this.refs.message).value = "";
  },

  handleEscalate: function (e) {
    e.preventDefault();
    var note = ReactDom.findDOMNode(this.refs.escalationNote).value.trim();
    var conversationId = this.props.conversation.id;
    var escalatedToId = this.state.escalatedToId;
    var priority = this.state.priority;
    NoteActions.createEscalateNoteRequest( sessionStorage.authenticationToken, conversationId, escalatedToId, note, priority );
    this.setState({action: "message"});
    ReactDom.findDOMNode(this.refs.escalationNote).value = "";
  },

  handleClose: function (e) {
    e.preventDefault();
    var note = ReactDom.findDOMNode(this.refs.closureNote).value.trim();
    NoteActions.createCloseNoteRequest(sessionStorage.authenticationToken, this.props.conversation.id, note);
    this.setState({action: "message"});
    ReactDom.findDOMNode(this.refs.closureNote).value = "";
  },

  showClose: function(e){
    e.preventDefault();
    this.setState({ action: "close" })
  },

  showEscalation: function(e){
    e.preventDefault();
    this.setState({ action: "escalate" })
  },

  setEscalatedTo: function(e){
    this.setState({ escalatedToId: Number(e.target.value) })
  },

  setPriority: function(e){
    this.setState({ priority: e.target.value})
  },

  getInitialState: function () {
    return {
      escalatedToId: 0,
      priority: 0,
      action: "message"
    }
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.staff && newProps.staff.length > 0) {
      this.setState({
        escalatedToId: newProps.staff[0].id
      });
    }
  },

  showComponent: function(name){
    return this.state.action === name ? {display: "block"} : {display: "none"};
  },

  handleCloseForm: function(e){
    e.preventDefault();
    this.setState({ action: "message" })
  },

  renderCloseButton: function() {
    return (
      <a className="btn btn-primary btn-sm message-button" onClick={this.showClose}>
        <span className="glyphicon glyphicon-ok"></span> Close Case
      </a>
    );
  },

  renderEscalateButton: function() {
    return (
      <a className="btn btn-danger btn-sm" onClick={this.showEscalation}>
        <span className="glyphicon glyphicon-fire"></span> Assign
      </a>
    );
  },

  render: function () {
    var staffData = this.props.staff;
    var staffElements;
    if(staffData && staffData.length > 0){
      staffElements = staffData.map(function(staff, i){
        return <MessageStaff key = {i}
                             staff={staff}
               />
      });
    }

    var closeButton;
    var escalateButton;
    if (!this.props.conversation || this.props.conversation.state !== "closed") {
      closeButton = this.renderCloseButton();
      escalateButton = this.renderEscalateButton();
    }

    return (
      <div>
        <div id="escalation-form" className="alert alert-dismissible alert-default" style={this.showComponent('escalate')}>
          <button type="button" className="close" onClick={this.handleCloseForm}>×</button>
          <form className="form alert-form">
            <div className="form-group">
              <label htmlFor="provider-select" className="control-label"> Assign this conversation to </label>&nbsp;
              <select id="provider-select"
                      className="form-control"
                      onChange={this.setEscalatedTo}
                  >
                {staffElements}
              </select>
              <label className="control-label"> with a priority level of</label>
              <select className="form-control"
                      onChange={this.setPriority}
              >
                <option value={0}>standard</option>
              </select>
              <label className="control-label">Please enter any relevant notes to help the assignee resolve the case.</label>
              <textarea id="escalation-notes" className="form-control" rows="1" type="text" ref="escalationNote"></textarea>
            </div>
            <button type="submit" className="btn btn-danger btn-sm form" onClick={this.handleEscalate}>
              <span className="glyphicon glyphicon-fire"></span> Assign
            </button>
          </form>
        </div>

        <div id="close-form" className="alert alert-dismissible alert-default" style={this.showComponent('close')}>
          <button type="button" className="close" onClick={this.handleCloseForm}>×</button>
          <form className="form alert-form">
            <div className="form-group">
              <label htmlFor="close-notes" className="control-label">Please enter any relevant notes to explain how the case was resolved.</label>
              <textarea id="close-notes" className="form-control" rows="1" type="text" ref="closureNote"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-sm form" onClick={this.handleClose}><span className="glyphicon glyphicon-ok"></span> Close Case</button>
          </form>
        </div>

        <div id="message-form" style={this.showComponent('message')}>
          <div id="alerts"></div>
          <div className="panel panel-body">
            <form>
              <textarea rows="3" className="form-control" placeholder="Reply" ref="message"></textarea>
            </form>
          </div>
          <div className="">
            <form>
              <a className="btn btn-success btn-sm message-button" onClick={this.handleSendMessage}>
                <span className="glyphicon glyphicon-ok"></span> Send
              </a>
              {closeButton}
              {escalateButton}
            </form>
            <hr/>
          </div>
        </div>
      </div>
    )
  }
});
