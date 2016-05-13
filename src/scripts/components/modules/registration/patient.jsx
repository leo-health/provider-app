var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="form-group col-sm-3">
          {this.props.firstName}
        </div>

        <div className="form-group col-sm-3">
          {this.props.lastName}
        </div>

        <div className="form-group col-sm-3">
          {this.props.sex}
        </div>

        <div className="row col-sm-3 form-group">
          {this.props.birthDate}
        </div>
        <br/>
      </div>
    )
  }
});
