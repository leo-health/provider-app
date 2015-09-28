var React = require('react');
var Reflux = require('reflux');
var MessageActions = require('../../../actions/messageActions');
var MessageStaff = require('../message/messageStaff');

module.exports = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    MessageActions.escalateMessageRequest(localStorage.authenticationToken, this.props.conversationId)
  },

  render: function () {
    var staff = this.props.staff;
    staff = staff.map(function(staff){
      return <MessageStaff staff={staff}/>
    });

    return(
      <div id="escalation-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" data-dismiss="alert">×</button>
        <form className="form">
          <div className="form-group">
            <label for="provider-select" className="control-label"> Assign this conversation to </label>&nbsp;
            <select id="provider-select" className="form-control">
              {staff}
            </select>
            <label className="control-label"> with a priority level of</label>
            <select className="form-control">
              <option>standard</option>
              <option>high</option>
            </select>
            <label className="control-label">Please enter any relevant notes to help the assignee resolve the case.</label>
            <textarea id="escalation-notes" className="form-control" rows="1" type="text"></textarea>
          </div>
          <button type="submit" className="btn btn-danger btn-sm form">
            <span className="glyphicon glyphicon-fire"></span> Escalate
          </button>
        </form>
      </div>
    )
  }
});
