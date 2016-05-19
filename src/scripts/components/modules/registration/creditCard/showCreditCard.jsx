var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="form-group col-sm-12">
          {this.props.creditCardBrand}****{this.props.last4}
        </div>
        <div className="form-group col-sm-12">
          Your card will be charged on a monthly base
        </div>
      </div>
    )
  }
});
