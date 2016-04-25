var React = require('react');
var EnrollmentForm = require('../modules/registration/enrollmentForm');

module.exports = React.createClass({
  render: function(){
    return(
      <div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <img src="/images/leo.png" alt="Leo Logo" id="signup_logo"/>
            <div id="signup_progress">
              <div className="progress-text" id="progress">
                <div className="progess-table">
                  <div className="signup-progress-text">Enroll</div>

                  <div className="signup-progress-text">You</div>

                  <div className="signup-progress-text">Your Child</div>

                  <div className="signup-progress-text">Review and Add Children</div>

                  <div className="signup-progress-text">Add default payment method</div>
                </div>
              </div>

              <div className="progress">
                <div className="progress-bar" style={{width: "60%"}}></div>
              </div>
            </div>
          </div>
        </div>
        <EnrollmentForm/>
      </div>
    )
  }
});
