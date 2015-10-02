var React = require('react');

module.exports = React.createClass({
  //componentWillMount: function(){
  //  this.pusher = new Pusher('218006d766a6d76e8672', {encrypted: true});
  //  this.statusChanel = this.pusher.subscribe(localStorage.email)
  //},
  //
  //componentDidMount: function(){
  //  this.messageChanel.bind('new_message', function(message){
  //    this.setState({messages: this.state.messages.concat(message)})
  //  }, this);
  //},

  render: function (){
    var status = this.props.status;
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
