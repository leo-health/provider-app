var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <span className="guardian-name">
        {this.props.guardian}
      </span>
    )
  }
});
