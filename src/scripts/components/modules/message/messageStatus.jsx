var React = require('react');

module.exports = React.createClass({
  render: function () {
    var escalatedTo = this.props.escaltedTo;
    if(!escalatedTo){
      return(
        <div>
          <hr/>
        </div>
      )
    }else{
      return(
        <div className="inline-hr">
          <span className="danger">Case escalated to {escalatedTo}</span>
        </div>
      )
    }
  }
});
