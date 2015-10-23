var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {conversationState: this.props.conversationState}
  },

  componentDidMount: function(){
    this.props.stateChanel.bind('new_state', function(data){
      if(data.conversation_id == this.props.conversationId){
        this.setState({conversationState: data.message_type})
      }
    }, this);
  },

  render: function (){
    var conversationState = this.state.conversationState;
    var display = "glyphicon pull-right";
    switch (conversationState){
      case "escalated":
        display = display + " glyphicon-exclamation-sign-default";
        break;
      case "open":
        display = display + " glyphicon-star";
        break;
      case "closed":
        display =  display + " glyphicon-ok-sign";
        break;
    }
    return(
      <span className = {display} aria-hidden = "true"></span>
    )
  }
});
