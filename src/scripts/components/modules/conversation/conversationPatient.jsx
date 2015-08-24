var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <span className="label label-warning child-label">{this.props.patient}</span>
    )
  }
});
