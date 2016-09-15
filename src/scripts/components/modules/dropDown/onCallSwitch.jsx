var React = require('react'),
    _ = require('lodash'),
    UserActions = require('../../../actions/userActions');

module.exports = React.createClass({
  headerSwitch: function(){
    if(this.isOncall(this.props.user)){
      var providers = this.props.oncallProviders.slice();
      return this.parseProviderNames(providers)
    }else{
      if(this.props.oncallProviders.length === 0){
        return 'No one is on call. All conversations will be sent to the nurse line.'
      }else{
        return this.parseProviderNameOffCall(this.props.oncallProviders)
      }
    }
  },

  isOncall: function(user){
    return !!_.find(this.props.oncallProviders, {id: user.id})
  },

  parseProviderNames: function(providers){
    var currentUserId = this.props.user.id;
    _.remove(providers, function(provider){return provider.id === currentUserId});
    switch(providers.length){
      case 0:
        return 'You are on call and will receive patient alerts by text.';
        break;
      case 1:
        return 'You are on call with ' + providers[0].first_name + ' and will receive patient alerts by text.';
        break;
      case 2:
        return 'You are on call with ' + providers[0].first_name + ', ' + providers[1].first_name + ' and will receive patient alerts by text.';
        break;
      default:
        var remainder =  providers.length - 2;
        return 'You are on call with ' + providers[0].first_name + ', ' + providers[1].first_name + ' and ' + remainder + ' others, and will receive patient alerts by text.';
    }
  },

  parseProviderNameOffCall: function(providers){
    switch(providers.length){
      case 1:
        return providers[0].first_name + ' is on call. Join him/her or enjoy your time off!';
        break;
      case 2:
        return providers[0].first_name + ' and ' + providers[1].first_name + ' are on call. Join them or enjoy your time off!';
        break;
      default:
        var remainder =  providers.length - 2;
        return providers[0].first_name + ', ' +  providers[1].first_name + ' and ' + remainder + ' more are on call, Join them or enjoy your time off!';
    }
  },


  promptSwitch: function(){
    if(this.props.user.is_oncall){
      return "Time for bed? Send calls to the nurse line."
    }else{
      return "Available to go on call? Get alerts sent to your phone."
    }
  },

  buttonTextSwitch: function(){
    if (this.props.user.is_oncall){
      return "GO OFF DUTY"
    }else{
      return "GO ON CALL"
    }
  },

  toggleOnCall: function(){
    UserActions.updateStaffProfileRequest({
      authentication_token: sessionStorage.authenticationToken,
      on_call: !this.props.user.is_oncall
    })
  },

  render: function(){
    return(
      <ul className="dropdown-menu call-switch" id="dropdown-menu-status">
        <div className="status-overlay cursor"></div>
        <div className="status-dropdown">
          <li><p>{this.headerSwitch()}</p></li>
          <li><span>{this.promptSwitch()}</span></li><br/>
          <li><button className="btn btn-primary btn-md status-button" onClick={this.toggleOnCall}>{this.buttonTextSwitch()}</button></li>
        </div>
      </ul>
    )
  }
});
