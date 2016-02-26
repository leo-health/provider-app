var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
		<div className="row">
			<div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
			    <div className="text-center">
			      <img src="../images/leo.png"/>
			      <h5>That was easy, <br/> all you have to do now is get the app.</h5>
			      <br/>
			      <img src="../images/screenshot.png"/>
			    </div>
			    <br/>
			    <div className="text-center">
			      <img src="../images/download.png"/>
			    </div>
			</div>
		</div>
    )
  }
});
