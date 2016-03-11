var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({
  getInitialState: function(){
    return {conversationState: null}
  },

  render: function (){
    var conversationState = this.props.conversationState;
    var stateClasses = classNames({
      'glyphicon glyphicon-exclamation-sign-default pull-right': conversationState === "escalated",
      'glyphicon glyphicon-star-empty pull-right': conversationState === "open",
      'glyphicon glyphicon-ok-circle pull-right': conversationState === "closed"
    });

    return(
      <span className = {stateClasses} aria-hidden = "true"></span>
    )
  }
});
