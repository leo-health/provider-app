var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var MessageActions = require('../../../actions/messageActions');
var MessageStore = require('../../../stores/messageStore');
var MessageStaff = require('../message/messageStaff');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(MessageStore, "onStatusChange")],

  onStatusChange: function(status){
    if(status.staff){
      this.setState({ staff: status.staff, escalatedToId: status.staff[0].id })
    }
  },

  handleSendMessage: function(e){
    e.preventDefault();
    var messageBody= ReactDom.findDOMNode(this.refs.message).value.trim();
    if (!messageBody) return;
    var typeName="text";
    var currentConversationId=this.props.conversationId;
    MessageActions.sendMessageRequest( sessionStorage.authenticationToken, messageBody, typeName, currentConversationId);
    ReactDom.findDOMNode(this.refs.message).value = "";
  },

  handleEscalate: function (e) {
    e.preventDefault();
    var note = ReactDom.findDOMNode(this.refs.escalationNote).value.trim();
    var conversationId = this.props.conversationId;
    var escalatedToId = this.state.escalatedToId;
    var priority = this.state.priority;
    ConversationActions.escalateConversationRequest( sessionStorage.authenticationToken, conversationId, escalatedToId, note, priority );
    this.setState({action: "message"});
    ReactDom.findDOMNode(this.refs.escalationNote).value = "";
  },

  handleClose: function (e) {
    e.preventDefault();
    var note = ReactDom.findDOMNode(this.refs.closureNote).value.trim();
    ConversationActions.closeConversationRequest(sessionStorage.authenticationToken, this.props.conversationId, note);
    this.setState({action: "message"});
    ReactDom.findDOMNode(this.refs.closureNote).value = "";
  },

  showClose: function(e){
    e.preventDefault();
    this.setState({action: "close"})
  },

  showEscalation: function(e){
    e.preventDefault();
    this.setState({action: "escalate"})
  },

  setEscalatedTo: function(e){
    this.setState({ escalatedToId: Number(e.target.value) })
  },

  setPriority: function(e){
    this.setState({ priority: e.target.value})
  },

  getInitialState: function () {
    return { escalatedToId: 0,
             priority: 0,
             staff: [],
             action: "message"
    }
  },

  componentDidMount: function(){
    MessageActions.fetchStaffRequest(sessionStorage.authenticationToken);
  },

  showComponent: function(name){
    if(this.state.action == name){
      return {display: "block"};
    }else{
      return {display: "none"};
    }
  },

  handleCloseForm: function(e){
    e.preventDefault();
    this.setState({action: "message"})
  },

  render: function () {
    var staff = this.state.staff;
    if(staff && staff.length > 0){
      staff = staff.map(function(staff, i){
        return <MessageStaff key = {i}
                             staff={staff}
               />
      });
    }

    return (
      <div>
        <div id="escalation-form" className="alert alert-dismissible alert-default" style={this.showComponent('escalate')}>
          <button type="button" className="close" onClick={this.handleCloseForm}>×</button>
          <form className="form">
            <div className="form-group">
              <label htmlFor="provider-select" className="control-label"> Assign this conversation to </label>&nbsp;
              <select id="provider-select"
                      className="form-control"
                      onChange={this.setEscalatedTo}
                  >
                {staff}
              </select>
              <label className="control-label"> with a priority level of</label>
              <select className="form-control"
                      onChange={this.setPriority}
                  >
                <option value={0}>standard</option>
                <option value={1}>high</option>
              </select>
              <label className="control-label">Please enter any relevant notes to help the assignee resolve the case.</label>
              <textarea id="escalation-notes" className="form-control" rows="1" type="text" ref="escalationNote"></textarea>
            </div>
            <button type="submit" className="btn btn-danger btn-sm form" onClick={this.handleEscalate}>
              <span className="glyphicon glyphicon-fire"></span> Escalate
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
              <a href="#" className="btn btn-success btn-sm message-button" onClick={this.handleSendMessage}>
                <span className="glyphicon glyphicon-ok"></span> Send
              </a>
              <a href="#" className="btn btn-primary btn-sm message-button" onClick={this.showClose}>
                <span className="glyphicon glyphicon-ok"></span> Close Case
              </a>
              <a href="#" className="btn btn-danger btn-sm" onClick={this.showEscalation}>
                <span className="glyphicon glyphicon-fire"></span> Escalate
              </a>
            </form>
            <hr/>
          </div>
        </div>
      </div>
    )
  }
});
