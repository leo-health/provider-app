var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="navbar-collapse collapse" id="navbar-main">
              <ul class="nav navbar-nav">
                <li><a href="../" class="navbar-brand"><img src="../images/leo.png" alt="..." /></a></li>
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="features">Features <span class="caret"></span></a>
                  <ul class="dropdown-menu" aria-labelledby="features">
                    <li><a href="../messaging/">Messaging</a></li>
                    <li class="divider"></li>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Settings</a></li>
                    <li><a href=""><strong>Log Out</strong></a></li>
                  </ul>
                </li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
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
