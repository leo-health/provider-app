var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var ConversationStatus = require("./conversationStatus");
var ConversationPatient = require("./conversationPatient");
var MessageActions = require('../../../actions/messageActions');

module.exports = React.createClass({
  handleOnClick: function(){
    var currentConversationId = this.props.conversation_id;
    var authentication_token = localStorage.authentication_token;
    MessageActions.fetchMessageRequest(authentication_token, currentConversationId);
  },

  render: function () {
    var lastMessage = this.props.lastMessage.body;
    if( lastMessage.length > 150 ){
      var shortMessage = lastMessage.substr(0, 150);
      lastMessage = shortMessage.substr(0, shortMessage.lastIndexOf(" ")) + "...";
    }
    var messageSendAt = moment(this.props.createdAt).calendar();
    var guardians =  _.map(this.props.guardians, function(guardian){
      return guardian.title + guardian.first_name + " " + guardian.last_name + "  "
    });
    var patients = this.props.patients.map(function( patient ){
      return <ConversationPatient key = {patient.id}
                                  patient = { patient.first_name + " " + patient.last_name}
             />
    });

    return(
      <div onClick={this.handleOnClick}>
        <a href="#" className="list-group-item">
          <h6 className="list-group-item-heading">{guardians}
            <span className="pull-right">{messageSendAt}</span>
          </h6>
          <p className = "patientList">
            {patients}
            <ConversationStatus status = {this.props.conversationStatus}/>
          </p>
          <p className="list-group-item-text">
            {lastMessage}
          </p>
        </a>
      </div>
    )
  }
});
