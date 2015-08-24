var React = require('react');

module.exports = React.createClass({
  render: function(){
    debugger
    var status = this.props.status;
    var display = "glyphicon pull-right";
    switch (status){
      case "escalated":
        display = display + " glyphicon-exclamation-sign-default";
        break;
      case "open":
        display = display + " lyphicon-star";
        break;
      case "closed":
        display =  display + "glyphicon-ok-sign";
        break;
    }

    return(
        <span className = {display} aria-hidden = "true"></span>
    )
  }
});



//<span className="glyphicon glyphicon-exclamation-sign-default pull-right" aria-hidden="true"></span>
//<span className="glyphicon glyphicon-ok-sign pull-right" aria-hidden="true"></span>
//          <span className="glyphicon glyphicon-star pull-right" aria-hidden="true"></span>
