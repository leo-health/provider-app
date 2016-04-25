var React = require('react');
var EnrollmentForm = require('../modules/registration/enrollmentForm');
var UserInfoForm = require('../modules/registration/userInfoForm');
var PaymentInfoForm = require('../modules/registration/paymentInfoForm');
var RegistrationActions = require('../../actions/registrationActions');
var RegistrationStore = require('../../stores/registrationStore');
var Reflux = require('reflux');
var Router = require('react-router');

module.exports = React.createClass({
  render: function(){
    return(
      <div id="signup_page">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <img src="/images/leo.png" alt="Leo Logo" id="signup_logo"/>
            <div id="signup_progress">
              <div className="progress-text" id="progress">
                <div className="progress-table">
                  <div className="signup-progress-text progress-text-container">Enroll</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">You</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">Your Child</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">Review</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">Payment</div>
                </div>

                <div className="progress progress-table">
                  <div className="progress-bar" style={{width: "7%"}}></div>
                </div>
              </div>
            </div>
          </div>

          <div id="signup_content">
            <EnrollmentForm/>
          </div>
        </div>
      </div>
    )
  }
});
