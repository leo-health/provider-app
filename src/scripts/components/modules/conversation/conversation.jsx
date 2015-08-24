var React = require('react');
var _ = require('lodash');
var ConversationPatient = require("./conversationPatient");
var conversationStatus = require("./conversationStatus");

module.exports = React.createClass({
  render: function () {
    var guardians =  _.map(this.props.guardians, function(guardian){
      return guardian.title + guardian.first_name + " " + guardian.last_name + "  "
    });

    var patients = this.props.patients.map(function( patient ){
      return <ConversationPatient patient = { patient.first_name + " " + patient.last_name}/>
    });

    return(
        //className="list-group-item active"
      <a href="" className="list-group-item">
        <h6 className="list-group-item-heading">{ guardians }
          <span className="pull-right">{ this.props.createdAt }</span>
        </h6>
        <p>
          {patients}
          <conversationStatus status = {this.props.conversationStatus} />
        </p>
        <p className="list-group-item-text">
          { this.props.latestMessage.body }
        </p>
      </a>
    )
  }
});
