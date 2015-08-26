var React = require('react');
var _ = require('lodash');
var ConversationStatus = require("./conversationStatus");
var ConversationPatient = require("./conversationPatient");
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  handleOnForget: function(){
    var messages = this.props.messages;
    MessageActions.displayMessages(messages);
  },

  render: function () {
    var latestMessage = this.props.latestMessage.body;
    var messageSendAt = this.props.createdAt;
    var guardians =  _.map(this.props.guardians, function(guardian){
      return guardian.title + guardian.first_name + " " + guardian.last_name + "  "
    });
    var patients = this.props.patients.map(function( patient ){
      return <ConversationPatient key = {patient.id}
                                  patient = { patient.first_name + " " + patient.last_name}
             />
    });

    if( latestMessage.length > 111 ){
      latestMessage = latestMessage.substr(0, 108) + "..."
    }

    return(
      <div onClick={this.handleOnForget}>
        <a href="" className="list-group-item">
          <h6 className="list-group-item-heading">{guardians}
            <span className="pull-right">{messageSendAt}</span>
          </h6>
          <p className = "patientList">
            {patients}
            <ConversationStatus status = {this.props.conversationStatus}/>
          </p>
          <p className="list-group-item-text">
            {latestMessage}
          </p>
        </a>
      </div>
    )
  }
});
