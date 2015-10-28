var React = require('react'),
    SignUpForm = require('../modules/registration/signupForm');

module.exports = React.createClass({
  render: function(){
    return(
      <div>
        <SignUpForm/>
      </div>
    )
  }
});
