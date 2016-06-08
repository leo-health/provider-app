var React = require('react'),
    MessageActions = require('../../../../actions/messageActions'),
    NoteActions = require('../../../../actions/noteActions'),
    MessageStaff = require('./messageStaff');

module.exports = React.createClass({
  setEscalatedTo: function(e){
    this.setState({ escalatedToId: Number(e.target.value) })
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.staff && newProps.staff.length > 0) {
      this.setState({
        escalatedToId: newProps.staff[0].id
      });
    }
  },

  render: function(){
    var staffData = this.props.staff;
    var staffElements;
    if(staffData && staffData.length > 0){
      staffElements = staffData.map(function(staff, i){
        return <MessageStaff key = {i}
                             staff={staff}
            />
      });
    }

    return(
      <div id="escalation-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" onClick={this.handleCloseForm}>×</button>
        <form className="form alert-form">
          <div className="form-group">
            <label className="control-label"> Assign this conversation to </label>&nbsp;
            <select className="form-control"
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
    )
  }
});
