var React = require('react'),
    ReactDom = require('react-dom'),
    Switch = require('react-toggle-switch'),
    UserActions = require('../../../actions/userActions');

require("react-toggle-switch/dist/css/switch.min.css");

module.exports = React.createClass({
  componentDidMount() {
    const node = ReactDom.findDOMNode(this.refs.toggle);
    node.addEventListener('click', this.handleClick, false);
  },

  headerSwitch: function(){
    if(this.props.isSms){
      return 'Back at your desk? Stop texts alerts on your phone'
    }else{
      return 'Away from your desk? Start text alerts on your phone'
    }
  },

  handleClick: function(e) {
    e.stopPropagation();
    UserActions.updateStaffProfileRequest({
      authentication_token: sessionStorage.authenticationToken,
      sms_enabled: !this.props.isSms
    });
  },

  render: function(){
    return(
      <ul className="dropdown-menu" ref="dropdown" id="dropdown-menu-status">
        <div className="status-overlay cursor"></div>
        <div className="status-dropdown">
          <li><p>You are available and the practice is open</p></li>
          <li><span>{this.headerSwitch()}</span></li><br/>
          <li>
            <span className="toggle-name">Off</span>
            <Switch className="switch" on={this.props.isSms} ref="toggle"/>
            <span className="toggle-name">On</span>
          </li>
        </div>
      </ul>
    )
  }
});
