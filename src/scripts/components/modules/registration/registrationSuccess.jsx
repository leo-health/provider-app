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
    if(status.inviteSuccess){
      this.setState({ display: true })
    }
  },

  inputOrDisplay: function(){
    return this.state.display ? <div className="text-center col-lg-12"><span className="glyphicon glyphicon-star" aria-hidden="true"></span><h3>You’ve successfully invited another guardian!</h3></div> : <InviteGuardian token={this.props.location.query.token}/>
  },

  render: function(){
    return(
      <div className="page-header row">
        <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4">
            <div className="text-center"><img src="../../images/leo.png"/>
              <h3>Account Confirmed</h3>
              <p className="lead">You are good to go, taking your child to the doctor just got a lot easier! If you have any questions or need assistance feel free to reach out to us at support@leohealth.com.</p>
              <p className="lead">Now all you have to do is download the app from the App Store and sign in to your account.</p>
              <a href="https://itunes.apple.com/app/id1051397244" target="_blank"><img className="lead" src="../images/download.png"/></a>
            </div>
        </div>
        {this.inputOrDisplay()}
      </div>
    )
  }
});
