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
        <form className="form-inline clearfix">
          <div className="form-group">
            <label for="provider-select" className="control-label">Assign <a id="escalation-message-count">2</a> messages to </label>&nbsp;
            <select id="provider-select" className="form-control">
              {staff}
            </select>
            <label> with</label>
            <select className="form-control">
              <option>standard</option>
              <option>high</option>
            </select> &nbsp;
            priority. &nbsp;
            <button type="submit" className="btn btn-danger btn-sm form">
              <span className="glyphicon glyphicon-fire"></span> Escalate
            </button>
          </div>
        </form>
      </div>
    )
  }
});
