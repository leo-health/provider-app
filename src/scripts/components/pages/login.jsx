var React = require('react'),
    LoginForm = require('../modules/login/loginForm');

module.exports = React.createClass({
  render: function(){
    return(
      <div>
        I am the login page

        <LoginForm/>
      </div>
    )
  }
});
