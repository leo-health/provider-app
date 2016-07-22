var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <span className="label warning-label child-label">
        {this.props.patient}
      </span>
    )
  }
});
