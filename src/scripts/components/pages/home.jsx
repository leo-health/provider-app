var React = require('react');
var HomeHeader = require('./homeHeader');
var FindFamily = require('../modules/search/findFamily');
var ConversationList = require('../modules/conversation/conversationList');
var ConversationHeader = require('../modules/conversation/conversationHeader');
var Footer = require('./footer');
var _ = require('lodash');

module.exports = React.createClass({
  componentWillMount: function(){
    this.subscribeToPusher();
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
    this.subscribeToBrowserTabFocusEvent();
  },

  subscribeToBrowserTabFocusEvent: function() {

    window.originalTabTitle = "LeoHealth - WebApp";
    document.title = window.originalTabTitle;

    window.onblur = function() {
      window.windowHasFocus = false;
    };
    window.onfocus = function() {
      window.windowHasFocus = true;
      document.title = window.originalTabTitle;
    };
  },

  componentWillUnmount: function () {
    this.unsubscribeFromPusher();
  },

  unsubscribeFromPusher: function(){
    this.pusher.unsubscribe('presence-provider_app');
  },

  render: function() {
    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-3">
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
