var React = require('react');

module.exports = React.createClass({
  render: function(){
    var note = this.props.note;
    return(
      <div>
        <small> 12:02 PM </small>
        <strong>Dr. Victoria Riese</strong>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
      </div>
    )
  }
});
