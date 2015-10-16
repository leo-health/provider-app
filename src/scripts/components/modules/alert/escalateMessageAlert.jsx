var React = require('react');
var Reflux = require('reflux');
var ConversationActions = require('../../../actions/conversationActions');
var MessageStaff = require('../message/messageStaff');

module.exports = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    var note = this.refs.note.getDOMNode().value.trim();
    var conversationId = this.props.conversationId;
    var escalatedToId = this.state.escalatedToId;
    var priority = this.state.priority;
    ConversationActions.escalateConversationRequest( localStorage.authenticationToken,
                                                     conversationId,
                                                     escalatedToId,
                                                     note,
                                                     priority )
  },

  setEscalatedTo: function(e){
    this.setState({ escalatedToId: Number(e.target.value) })
  },

  setPriority: function(e){
    this.setState({ priority: e.target.value})
  },

  getInitialState: function(){
    return { escalatedToId: this.props.staff[0].id,
             priority: 0
           }
  },

  render: function () {
    var staff = this.props.staff;
    staff = staff.map(function(staff, i){
      return <MessageStaff key = {i}
                           staff={staff}
             />
    });

    return(
      <div id="escalation-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" data-dismiss="alert">×</button>
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
            <textarea id="escalation-notes" className="form-control" rows="1" type="text" ref="note"></textarea>
          </div>
          <button type="submit" className="btn btn-danger btn-sm form" onClick={this.handleClick}>
            <span className="glyphicon glyphicon-fire"></span> Escalate
          </button>
        </form>
      </div>
    )
  }
});
