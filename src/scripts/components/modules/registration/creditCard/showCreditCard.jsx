var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="form-group col-sm-11 col-sm-offset-1">
          {this.props.creditBrand}****{this.props.last4}
        </div>
        <div className="form-group col-sm-11 col-sm-offset-1">
          Your card will be charged on a monthly base
        </div>
      </div>
    )
  }
});
