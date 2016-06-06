var React = require('react'),
    InviteGuardian = require('./guardian/inviteGuardian');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
          <div className="text-center">
            <img src="../images/leo.png"/>
            <h4>Account Confirmed</h4>
            <p>Taking your child to the doctor just got a lot easier!</p>
            <br/>
            <img src="../images/screenshot.png"/>
          </div>
        </div>
        <InviteGuardian/>
      </div>
    )
  }
});
