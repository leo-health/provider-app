var React = require('react'),
    Toggle = require('react-toggle'),
    UserActions = require('../../../actions/userActions'),
    UserStore = require('../../../stores/userStore'),
    Reflux = require('reflux');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(UserStore, "onStatusChange")],

  getInitialState: function(){
    return { isSms: this.props.isSms }
  },

  onStatusChange: function(status){
    if(status.isSms) this.setState({ isSms: this.state.isSms })
  },

  headerSwitch: function(){
    if(this.props.isSms){
      return 'Back at your desk? Stop texts alerts on your phone'
    }else{
      return 'Away from your desk? Get Alerts on your phone'
    }
  },

  onChange: function(){
    UserActions.updateStaffProfileRequest({
      authentication_token: sessionStorage.authenticationToken,
      sms_enabled: !this.state.isSms
    })
  },

  test: function(e){
    e.stopPropagation();
  },

  render: function(){
    return(
      <ul className="dropdown-menu">
        <li><p>Your are available and the practice is open</p></li>
        <li><span>{this.headerSwitch()}</span></li><br/>
        <li>
          <span className="toggle-name">Off</span>
            <Toggle defaultChecked={this.state.isSms}  aria-label="No label tag" onChange={this.onChange}/>
          <span className="toggle-name">On</span>
        </li>
      </ul>
    )
  }
});
