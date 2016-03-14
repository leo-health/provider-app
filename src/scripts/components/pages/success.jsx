var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
        <div className="row">
          <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
            <div className="text-center">
              <img src="../images/leo.png"/>
              <h5>Account Confirmed</h5>
              <h6>Taking your child to the doctor just got a lot easier!</h6>
              <br/>
              <img src="../images/screenshot.png"/>
            </div>
          </div>
        </div>
    )
  }
});
