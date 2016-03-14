var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
		<div className="row">
			<div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
			    <div className="text-center">
			      <img src="../images/leo.png"/>
			      <h5>Thanks for signing up with Leo!</h5>
            <h5>Once your request is accepted by the primary guardian, all you need to do is open the Leo app on your iPhone and log in.</h5>
			      <br/>
			      <img src="../images/screenshot.png"/>
			    </div>
			</div>
		</div>
    )
  }
});
