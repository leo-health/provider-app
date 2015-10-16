var React = require('react');

module.exports = React.createClass({
  componentDidMount: function(){
    this.props.stateChanel.bind('new_state', function(state){
      if(state.conversation_id == this.props.conversationId){
        this.setState({state: state.new_status})
      }else{
        return
      }
    }, this);
  },

  render: function (){
    var state = this.props.conversationState;
    var display = "glyphicon pull-right";
    switch (state){
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
