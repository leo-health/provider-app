var React = require('react'),
    ReactDom = require('react-dom'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    classNames = require('classnames'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    PaymentInfoForm = require('../modules/registration/paymentInfoForm'),
    RegistrationActions = require('../../actions/registrationActions'),
    RegistrationStore = require('../../stores/registrationStore');

module.exports = React.createClass({
  //validatorTypes: {
  //  email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
  //  password: Joi.string().min(8).max(127).trim().required().label("Password")
  //},
  //
  //getValidatorData: function(){
  //  return this.state;
  //},

  //onChange: function(ref) {
  //  return event => {
  //    if (this.submitHasBeenAttemptedOnce) {
  //      this.props.handleValidation(ref)();
  //    }
  //
  //    var newState = {};
  //    newState[ref] = event.target.value;
  //    this.setState(newState);
  //  }
  //},

  render: function(){
    return(
      <div id="signup_page">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <img src="/images/leo.png" alt="Leo Logo" id="signup_logo"/>
            <div id="signup_progress">
              <div className="progress-text" id="progress_xs">
                <span className="signup-xs-text show">(1/5) Enroll</span>
                <span className="signup-xs-text">(2/5) You</span>
                <span className="signup-xs-text">(3/5) Your Child</span>
                <span className="signup-xs-text">(4/5) Review</span>
                <span className="signup-xs-text">(5/5) Payment</span>
              </div>

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
            {this.props.children && React.cloneElement(this.props.children,{onChange: this.onChange, route: this.props.route})}
          </div>
        </div>
      </div>
    )
  }
});
