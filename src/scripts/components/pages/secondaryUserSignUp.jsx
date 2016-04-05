var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
            <div className="text-center">
              <img src="../images/leo.png"/>
              <h5>Thanks for signing up with Leo!</h5>
              <h6>
                We're excited to have you onboard, but to make sure your child's data is safe, the person who originally
                invited you must confirm that the details you provided to us are correct. Once we've heard from them,
                we'll send you a link with instructions on how to download the app, and then you can take advantage of
                all of Leo's services.
              </h6>
              <br/>
              <img src="../images/screenshot.png"/>
            </div>
        </div>
      </div>
    )
  }
});
