var React = require('react'),
    ReactDom = require('react-dom'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory, withRouter, } = ReactRouter,
    classNames = require('classnames'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    RegistrationActions = require('../../actions/registrationActions'),
    RegistrationStore = require('../../stores/registrationStore'),
    EnrollmentForm = require('../modules/registration/enrollmentForm'),
    UserInfoForm = require('../modules/registration/userInfoForm'),
    PatientInfoForm = require('../modules/registration/patientInfoForm'),
    PaymentInfoForm = require('../modules/registration/paymentInfoForm'),
    ReviewForm = require('../modules/registration/reviewForm'),
    ProgressBarMap = {
      enroll: "7%",
      you: "21%",
      patient: "45%",
      payment: "67%",
      review: "90%"
    };

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onRegistrationStatusChange")
  ],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      enrollment: undefined,
      creditCardToken: undefined,
      creditCardBrand: undefined,
      last4: undefined,
      nextPage: "enroll",
      progressBar: ProgressBarMap.enroll,
      insurers: []
    }
  },

  createCreditCard: function(creditCardComponent){
    RegistrationActions.createCreditCardRequest({
      number: creditCardComponent.refs.cardNumber.value.trim(),
      cvc:creditCardComponent.refs.cvc.value.trim(),
      exp_month: creditCardComponent.refs.expirationMonth.value.trim(),
      exp_year: creditCardComponent.refs.expirationYear.value.trim(),
      address_zip: creditCardComponent.refs.zip.value.trim()
    }, "review");
  },

  componentDidMount: function(){
    Stripe.setPublishableKey('pk_test_LRYSNRBvOYUG47Sg4QZqtlkB');
  },

  componentWillMount: function(){
    window.onbeforeunload = function(){
      return "You will lose all unsaved changes to your application."
    };

    RegistrationActions.fetchInsurersRequest()
  },

  onRegistrationStatusChange: function(status){
    this.setState(status);
    if(status.enrollmentToken) sessionStorage['enrollmentToken'] = status.enrollmentToken;
    if(status.nextPage){this.navigateTo(status.nextPage)}
  },

  navigateTo: function(destination){
    this.context.router.push({
      pathname: "/signup",
      query: {page: destination}
    });

    this.setState({
      progressBar: ProgressBarMap[destination],
      nextPage: destination
    });

    return false;
  },

  componentWillUnmount: function(){
    sessionStorage.removeItem('enrollmentToken');
  },

  selectPage: function(){
    var page;
    switch(this.state.nextPage){
      case "enroll":
        page = <EnrollmentForm/>;
        break;
      case "you":
        page = <UserInfoForm insurers={this.state.insurers}/>;
        break;
      case "patient":
        page = <PatientInfoForm navigateTo={this.navigateTo}/>;
        break;
      case "payment":
        page = <PaymentInfoForm createCreditCard={this.createCreditCard}/>;
        break;
      case "review":
        page = <ReviewForm navigateTo={this.navigateTo}
                           creditCardBrand={this.state.creditCardBrand}
                           createCreditCard={this.createCreditCard}
                           last4={this.state.last4}
                           enrollment={this.state.enrollment}/>;
        break;
      default:
        page = <EnrollmentForm/>;
        break;
    }
    return page
  },

  render: function(){
    var signUpContent = this.selectPage();

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
                  <div className="signup-progress-text progress-text-container">Payment</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">Review</div>
                </div>
                <div className="progress progress-table">
                  <div className="progress-bar" style={{width: this.state.progressBar}}></div>
                </div>
              </div>
            </div>
          </div>

          <div id="signup_content">
            {signUpContent}
          </div>
        </div>
      </div>
    )
  }
});