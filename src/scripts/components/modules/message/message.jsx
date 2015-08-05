var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
        <div className="checkbox checkbox-circle checkbox-danger">
          <input id="checkbox1" type="checkbox"/>
          <label for="checkbox1">
            <small> 12:00 PM </small>
            <strong>Dr. Om Lala</strong>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
          </label>
        </div>
        <div className="inline-hr">
          <span className="primary">Case closed by Dr. Om Lala</span>
        </div>
      </div>
    )
  }
});
