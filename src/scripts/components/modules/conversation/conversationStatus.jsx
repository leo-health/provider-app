var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {status: this.props.status}
  },

  componentWillMount: function(){
    this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
    this.statusChanel = this.pusher.subscribe(localStorage.email)
  },

  componentDidMount: function(){
    this.statusChanel.bind('new_status', function(status){
      if(status.conversation_id == this.props.conversationId){
        this.setState({status: status.new_status})
      }else{
        return
      }
    }, this);
  },

  render: function (){
    var status = this.state.status;
    var display = "glyphicon pull-right";
    switch (status){
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
