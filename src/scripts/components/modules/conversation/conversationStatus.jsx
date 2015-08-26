var React = require('react');

module.exports = React.createClass({
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
