var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <div id="first-names" className="panel panel-heading">
          <form  className="">
            <input type="text" className="typeahead form-control" placeholder="Find Participant"  data-provide="typeahead"/>
          </form>
        </div>
        <div id="first-names" className="panel panel-heading">
          <span className="btn btn-primary"><span className="glyphicon glyphicon-user"></span> Ben</span>
        </div>
      </div>
    )
  }
});
