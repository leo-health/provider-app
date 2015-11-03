var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
		<div className="row">
			<div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
			    <div className="text-center">
			      <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
			      <h5>That was easy, <br/> all you have to do now is get the app.</h5>
			      <br/>
			      <a href="../">
			        <img src="../images/screenshot.png" alt="..." />
			      </a>
			    </div>
			    <br/>
			    <div className="text-center">
			      <a href="../" className=""><img src="../images/download.png" alt="..." /></a>
			    </div>
			</div>
		</div>
    )
  }
});
