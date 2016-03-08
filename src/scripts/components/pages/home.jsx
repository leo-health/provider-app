var React = require('react');
var HomeHeader = require('./homeHeader');
var FindFamily = require('../modules/search/findFamily');
var ConversationList = require('../modules/conversation/conversationList');
var ConversationHeader = require('../modules/conversation/conversationHeader');
var MessageNote = require('../modules/messageNote/messageNote');
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

    var id = this.getUserId();
    this.pusher.subscribe('presence-provider_app');
  },

  componentWillUnmount: function () {
    this.unsubscribeFromPusher();
  },

  unsubscribeFromPusher: function(){
    var id = this.getUserId();
    this.pusher.unsubscribe('presence-provider_app');
  },

  getUserId: function(){
    if (sessionStorage.user) return JSON.parse(sessionStorage.user).id;
  },

  render: function() {
    return (
      <div>
        <HomeHeader/>
        <div className="container page-header">
          <div className="row">
            <div className="col-lg-3">
              <FindFamily/>
              <ConversationHeader/>
              <p>
                <div className="btn-group">
                  <a href="#" className="btn btn-sm btn-default">Assigned to</a>
                  <div className="btn-group">
                    <a href="#" className="btn btn-sm btn-default">Erin Hannah Gold PNP</a>
                    <a href="#" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Staff 1</a></li>
                      <li><a href="#">Staff 2</a></li>
                      <li><a href="#">Staff 3</a></li>
                    </ul>
                  </div>
                </div>
              </p>
            </div>
          </div>
          <div className="row">
            <div id="left" className="col-lg-3">
              <ConversationList pusher={this.pusher}/>
            </div>
            <div id="right" className="col-lg-9">
              <MessageNote pusher={this.pusher}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    )
  }
});
