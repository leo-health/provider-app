var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory} = ReactRouter,
    RegistrationStore = require('../../../stores/registrationStore'),
    InviteGuardian = require('./guardian/inviteGuardian');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onStatusChange")
  ],

  getInitialState: function(){
    return { display: false }
  },

  onStatusChange: function(status) {
    if(status.inviteSuccess) this.setState({ display: true })
  },

  inputOrDisplay: function(){
    return this.state.display ? <div className="col-lg-12">Successfully Invited</div> : <InviteGuardian/>
  },

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
        {this.inputOrDisplay()}
      </div>
    )
  }
});
