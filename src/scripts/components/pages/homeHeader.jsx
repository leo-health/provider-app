var React = require('react');
var LoginAction = require('../../actions/loginActions');
var Router = require('react-router');
var leoUtil = require('../../utils/common').StringUtils;

module.exports = React.createClass({

  handleOnLogout: function(){
    var authenticationToken = localStorage.authenticationToken;
    if(!authenticationToken) return;
    LoginAction.logoutRequest(authenticationToken)
  },

  render: function() {
    var user;
    if(localStorage.user) user = leoUtil.formatName(JSON.parse(localStorage.user));

    return (
      <div>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse" id="navbar-main">
              <ul className="nav navbar-nav">
                <li><a href="../" className="navbar-brand"><img src="../images/leo.png" alt="..." /></a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="../login/">Welcome, {user}</a>
                </li>
                <li>
                  <a onClick={this.handleOnLogout}><strong>logout</strong></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
