var React = require('react'),
    Reflux = require('reflux'),
    HomeHeader = require('./homeHeader'),
    FindFamily = require('../modules/search/findFamily'),
    ConversationList = require('../modules/conversation/conversationList'),
    UserStore = require('../../stores/userStore'),
    UserActions = require('../../actions/userActions'),
    Footer = require('./footer');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(UserStore, "onStatusChange")],

  getInitialState: function(){
    return { user: '' }
  },

  onStatusChange: function(status){
    if(status.self){
      this.setState({user: status.self});
    }
  },

  componentWillMount: function(){
    this.subscribeToPusher();
    this.subscribeToBrowserTabFocusEvent();
    this.titleBlink();
    this.notificationPermission();
  },

  componentDidMount: function() {
    UserActions.fetchIndividualUserRequest({authentication_token: sessionStorage.authenticationToken})
  },

  subscribeToPusher: function(){
    this.pusher = new Pusher(leo.PUSHER_APPLICATION_KEY, {
      encrypted: true,
      authEndpoint: leo.API_URL+"/pusher/auth",
      auth: {
        params: { authentication_token: sessionStorage.authenticationToken }
      }
    });

    this.pusher.subscribe('presence-provider_app');
  },

  subscribeToBrowserTabFocusEvent: function() {
    window.originalTabTitle = document.title;
    window.onblur = function() {
      window.windowHasFocus = false;
    };
    window.onfocus = function() {
      window.windowHasFocus = true;
      document.title = window.originalTabTitle;
    };
  },

  titleBlink: function(){
    window.flashTitle = function(newMessage, count){
      function step() {
        if(window.windowHasFocus) return;
        document.title = (document.title == window.originalTabTitle) ? newMessage : window.originalTabTitle;
        if (--count > 0) setTimeout(step, 600)
      }
      step()
    }
  },

  notificationPermission: function(){
    Notification.requestPermission();
  },

  componentWillUnmount: function () {
    this.unsubscribeFromPusher();
  },

  unsubscribeFromPusher: function(){
    this.pusher.unsubscribe('presence-provider_app');
  },

  renderHomeHeader: function(){
    if(this.state.user) return <HomeHeader user={this.state.user} pusher={this.pusher}/>
  },

  render: function() {
    return (
      <div>
        {this.renderHomeHeader()}
        <div className="container page-header main-container">
          <div className="row">
            <div className="col-lg-3 find-family-container">
              <FindFamily/>
            </div>
          </div>
          <ConversationList pusher={this.pusher}/>
          <Footer/>
        </div>
      </div>
    )
  }
});
