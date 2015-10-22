var React = require('react'),
    SignupForm = require('../modules/registration/signupForm');

module.exports = React.createClass({
  render: function(){
    return(
      <div>
        <SignupForm/>
      </div>
    )
  }
});
