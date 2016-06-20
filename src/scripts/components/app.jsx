var React = require('react'),
    ReactRouter = require('react-router'),
    {browserHistory} = ReactRouter;

module.exports = React.createClass({
  render: function(){
    return(
      <div className = "container">
        {this.props.children}
      </div>
    );
  }
});
