var React = require('react');
var classNames = require('classnames');

module.exports = React.createClass({
  getInitialState: function(){
    return {conversationState: null}
  },

  render: function (){
    var conversationState = this.props.conversationState;
    return(
      <span aria-hidden = "true"></span>
    )
  }
});
