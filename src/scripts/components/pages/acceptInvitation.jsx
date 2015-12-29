var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
		<div className="row">
			<div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
			    <div className="text-center">
			      <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
			      <h5>Thank you for accepting this invitation.</h5>
			      <br/>
			    </div>
			</div>
		</div>
    )
  }
});
