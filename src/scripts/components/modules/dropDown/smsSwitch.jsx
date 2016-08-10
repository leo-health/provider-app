var React = require('react'),
    ReactDom = require('react-dom'),
    Toggle = require('react-toggle'),
    UserActions = require('../../../actions/userActions'),
    UserStore = require('../../../stores/userStore'),
    classNames = require('classnames');
    Reflux = require('reflux');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(UserStore, "onStatusChange")],

  getInitialState: function(){
    return { isSms: this.props.isSms, stayOpen: false }
  },

  onStatusChange: function(status){
    if(status.isSms) this.setState({ isSms: this.state.isSms })
  },

  componentDidMount() {
    const node = ReactDom.findDOMNode(this.refs.toggle);
    node.addEventListener('click', this.handleClick, false);
  },

  headerSwitch: function(){
    if(this.props.isSms){
      return 'Back at your desk? Stop texts alerts on your phone'
    }else{
      return 'Away from your desk? Get Alerts on your phone'
    }
  },

  handleClick: function(e) {
    this.refs.toggle.setState({checked: !this.refs.toggle.state.checked});
    UserActions.updateStaffProfileRequest({
      authentication_token: sessionStorage.authenticationToken,
      sms_enabled: !this.state.isSms
    });

    e.stopPropagation();
  },

  render: function(){
    return(
      <ul className='dropdown-menu' ref='dropdown'>
        <li><p>Your are available and the practice is open</p></li>
        <li><span>{this.headerSwitch()}</span></li><br/>
        <li>
          <span className="toggle-name">Off</span>
            <Toggle defaultChecked={this.state.isSms} ref='toggle'/>
          <span className="toggle-name">On</span>
        </li>
      </ul>
    )
  }
});
