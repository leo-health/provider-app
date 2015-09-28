var React = require('react');
var Reflux = require('reflux');

module.exports = React.createClass({
  render: function () {
    return (
      <div id="notes-container" className="pre-scrollable panel panel-body">
        <h4>Notes</h4>
        <blockquote>
          <div><small> 12:00 PM </small><strong>Dr. Victoria Riese</strong>   Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.Cras sit amet nibh libero, in gravida nulla.
          </div>
        </blockquote>
      </div>
    )
  }
});
