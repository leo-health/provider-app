var React = require('react'),
    Reflux = require('reflux'),
    UserActions = require('../../../actions/userActions');

module.exports = React.createClass({
  headerSwitch: function(){
    if(this.props.isOncall){
      if(this.props.oncallProviders.length === 0){
        return 'Your are on call and will receive patient alerts by text'
      }else{
        return 'Your are on call with' + this.parseProviderNames(this.props.oncallProviders) + ' and will receive patient alerts by text'
      }
    }else{
      if(this.props.oncallProviders.length === 0){
        return 'No one is on call. All conversations will be sent to the nurse line'
      }else{
       return this.parseProviderNames(this.props.oncallProviders) + 'are on call. Join them or enjoy your time off!'
      }
    }
  },

  parseProviderNames: function(providers){
    var result=' ';
    for(var i = 0; i < providers.length; i++){
      if(i === providers.length -1){
        result = result + providers[i].first_name
      }else{
        result = result + providers[i].first_name + ' and '
      }
    }
    return result
  },

  promptSwitch: function(){
    if(this.props.isOncall){
      return "Time for bed? Send calls to the nurse line."
    }else{
      return "Available to go on call? Get Alerts sent to your phone."
    }
  },

  buttonTextSwitch: function(){
    if (this.props.isOncall){
      return "GO OFF DUTY"
    }else{
      return "GO ON CALL"
    }
  },

  toggleOnCall: function(){
    UserActions.updateStaffProfileRequest({
      authentication_token: sessionStorage.authenticationToken,
      on_call: !this.props.isOncall
    })
  },

  render: function(){
    return(
      <ul className="dropdown-menu row">
        <li className="col-lg-12"><h5>{this.headerSwitch()}</h5></li>
        <li className="col-lg-offset-1 col-lg-10"><h6 className='long-string'>{this.promptSwitch()}</h6></li>
        <li className="col-lg-offset-2 col-lg-8">
          <button className="full-width-button" onClick={this.toggleOnCall}>{this.buttonTextSwitch()}</button>
        </li>
      </ul>
    )
  }
});
