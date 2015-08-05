var React = require('react');
var LoginAction = require('../../actions/loginActions');
var Router = require('react-router');

module.exports = React.createClass({

  handleOnLogout: function(){
    var authentication_token = localStorage['authentication_token'];
    if(!authentication_token){
      return
    }
    LoginAction.logoutRequest(authentication_token)
  },

  render: function() {
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
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#" id="features">Features <span className="caret"></span></a>
                  <ul className="dropdown-menu" aria-labelledby="features">
                    <li><a href="../messaging/">Messaging</a></li>
                    <li className="divider"></li>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Settings</a></li>
                    <li><a onClick={this.handleOnLogout}><strong>Log Out</strong></a></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="https://www.zendesk.com/">Help</a>
                </li>
                <li>
                  <a href="../login/">Welcome, Dr. Om Lala</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
