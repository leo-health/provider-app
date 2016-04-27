var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Router = require('react-router');
var classNames = require('classnames');
var validation = require('react-validation-mixin');
var Joi = require('joi');
var strategy = require('joi-validation-strategy');

var EnrollmentForm = require('../modules/registration/enrollmentForm');
var UserInfoForm = require('../modules/registration/userInfoForm');
var PaymentInfoForm = require('../modules/registration/paymentInfoForm');

var RegistrationActions = require('../../actions/registrationActions');
var RegistrationStore = require('../../stores/registrationStore');

module.exports = validation(strategy)(React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onRegistrationStatusChange")
  ],

  getInitialState: function() {
    return {
      email: null,
      password: null,
      page: 'enroll'
    }
  },

  onRegistrationStatusChange: function(status) {
    if(status.nextPage){
      this.setState({
        page: status.nextPage
      })
    }
  },

  validatorTypes: {
    email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
    password: Joi.string().min(8).max(127).trim().required().label("Password")
  },

  getValidatorData: function(){
    return this.state;
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if(error) return;
      RegistrationActions.createEnrollmentRequest(this.state)
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  onChange: function(ref) {
    return event => {
      if (this.submitHasBeenAttemptedOnce) {
        this.props.handleValidation(ref)();
      }

      var newState = {};
      newState[ref] = event.target.value;
      this.setState(newState);
    }
  },

  //switchPage: function(){
  //  switch(this.state.page){
  //    case "enroll":
  //      return  <EnrollmentForm onChange={this.onChange} handleOnSubmit={this.handleOnSubmit}/>;
  //    case "userInfo":
  //      return  <UserInfoForm onChange={this.onChange} handleOnSubmit={this.handleOnSubmit}/>;
  //    case "payment":
  //      return  <PaymentInfoForm onChange={this.onChange} handleOnSubmit={this.handleOnSubmit}/>;
  //    default:
  //      return  <EnrollmentForm onChange={this.onChange} handleOnSubmit={this.handleOnSubmit}/>;
  //  }
  //},

  render: function(){
    var page = this.switchPage();

    return(
        <div id="signup_page">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <img src="/images/leo.png" alt="Leo Logo" id="signup_logo"/>
              <div id="signup_progress">
                <div class="progress-text" id="progress_xs">
                  <span class="signup-xs-text show">(1/5) Enroll</span>
                  <span class="signup-xs-text">(2/5) You</span>
                  <span class="signup-xs-text">(3/5) Your Child</span>
                  <span class="signup-xs-text">(4/5) Review</span>
                  <span class="signup-xs-text">(5/5) Payment</span>
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
              {page}
            </div>
          </div>
        </div>
    )
  }
}));
