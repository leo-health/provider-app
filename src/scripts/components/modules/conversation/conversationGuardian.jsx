var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <span className="label guardian-name">
        {this.props.guardian}
      </span>
    )
  }
});
