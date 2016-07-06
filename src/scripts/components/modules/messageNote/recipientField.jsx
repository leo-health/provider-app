var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="recipient-field-container">
        <div className="pull-left to-field">
          <span className="to-field--to">To:</span>
          <div className="to-field--parents">
            <span className="glyphicon glyphicon-user"></span>
          </div>
        </div>
        <span className="glyphicon glyphicon-info-sign pull-right note-toggler"
              onClick={this.props.onToggleInformation}></span>
      </div>
    )
  }
});
