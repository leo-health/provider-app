var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
		<div className="row">
			<div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
			    <div className="text-center">
			      <img src="../images/leo.png"/>
			      <h5>You need to open this link on your iPhone device with the Leo app installed. Sorry for the inconvenience!</h5>
			      <br/>
			      <img src="../images/screenshot.png"/>
			    </div>
			</div>
		</div>
    )
  }
});
