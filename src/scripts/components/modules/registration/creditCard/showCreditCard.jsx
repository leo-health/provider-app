var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="form-group">
        <label className="control-label">Credit or Debit Card</label>
        <p className="lead">{this.props.creditCardBrand + ' **** ' + this.props.last4}</p>
        <div className="lead">Your card will be charged on a monthly basis.</div>
      </div>
    )
  }
});
