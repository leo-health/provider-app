var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="page-header row">
        <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
            <div className="text-center">
              <img src="../../images/leo.png"/>
              <h2>Thanks for signing up with Leo!</h2>
              <p>
                We're excited to have you onboard, but to make sure your child's data is safe, the person who originally invited you must confirm that the details you provided to us are correct.
              </p>
              <p>
                Once we've heard from them, you can sign in to the app and take advantage of all of Leo's services.
              </p>
              <br/>
              <a href="https://itunes.apple.com/app/id1051397244"><img src="../../images/download.png"/></a>
            </div>
        </div>
      </div>
    )
  }
});
