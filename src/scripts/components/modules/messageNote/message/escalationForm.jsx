var React = require('react'),
    MessageActions = require('../../../../actions/messageActions'),
    NoteActions = require('../../../../actions/noteActions'),
    leoUtil = require('../../../../utils/common').StringUtils;

module.exports = React.createClass({
  getInitialState: function () {
    return { escalatedToId: this.props.staff[0].id, priority: 0, escalationNote: '' }
  },

  handleEscalatedToChange: function(e){
    this.setState({ escalatedToId: Number(e.target.value) })
  },

  handleEscalationNoteChange: function(e){
    this.setState({ escalationNote: e.target.value })
  },

  handleEscalate: function (e) {
    e.preventDefault();
    NoteActions.createEscalateNoteRequest(
        sessionStorage.authenticationToken,
        this.props.conversation.id,
        this.state.escalatedToId,
        this.state.escalationNote,
        this.state.priority
    );
    this.props.showMessage()
  },

  parseStaff: function(){
    if(this.props.staff.length > 0){
      return this.props.staff.map(function(staff, i){
        return <option className="dark-gray-font" key={i} value={staff.id}>{leoUtil.formatName(staff)}</option>
      })
    }
  },

  render: function(){
    return(
      <div id="escalation-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" onClick={this.props.showMessage}>×</button>
        <form className="form alert-form">
          <div className="form-group">
            <label className="control-label medium-font-size"> Assign this conversation to </label>&nbsp;
            <select className="form-control medium-font-size" onChange={this.handleEscalatedToChange} value={this.state.escalatedToId}>
              {this.parseStaff()}
            </select>
            <label className="control-label medium-font-size">Please enter any relevant notes to help the assignee resolve the case.</label>
            <textarea className="form-control medium-font-size"
                      value={this.state.escalationNote}
                      onChange={this.handleEscalationNoteChange}
                      rows="1"
                      type="text">
            </textarea>
          </div>
          <button type="submit" className="btn btn-danger btn-sm form message-button" onClick={this.handleEscalate}>
            <span className="glyphicon glyphicon-fire"></span> Assign
          </button>
        </form>
      </div>
    )
  }
});
