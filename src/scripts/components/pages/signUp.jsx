var React = require('react'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory, withRouter, } = ReactRouter,
    classNames = require('classnames'),
    _ = require('lodash'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
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
      enrollment: '',
      patients: [],
      creditCardToken: '',
      creditCardBrand: '',
      last4: '',
      nextPage: 'enroll',
      progressBar: ProgressBarMap.enroll,
      status: '',
      message: ''
    }
  },

  componentDidMount: function(){
    Stripe.setPublishableKey(leo.THE_STRIPE_KEY);
  },

  componentWillMount: function(){
    window.onbeforeunload = function(){
      return "You will lose all unsaved changes to your application."
    };
  },

  onRegistrationStatusChange: function(status){
    this.setState(status);
    if(status.patient) this.setState({patients: this.state.patients.concat(status.patient)});
    if(status.deletedPatient) this.setState({patients: _.reject(this.state.patients, {id: status.deletedPatient.id})});
    if(status.updatedPatient) this.setState({patients: this.replacePatient(this.state.patients, status.updatedPatient)});
    if(status.enrollmentToken) sessionStorage['enrollmentToken'] = status.enrollmentToken;
    if(status.nextPage){this.navigateTo(status.nextPage)}
  },

  replacePatient: function(patients, newPatient){
    return _.map(patients, function(patient){ return (patient.id === newPatient.id) ? newPatient : patient })
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
        page = <EnrollmentForm status={this.state.status}
                               message={this.state.message}/>;
        break;
      case "you":
        page = <UserInfoForm status={this.state.status}
                             message={this.state.message}/>;
        break;
      case "patient":
        page = <PatientInfoForm navigateTo={this.navigateTo}
                                patients={this.state.patients}
                                enrollment={this.state.enrollment}/>;
        break;
      case "payment":
        page = <PaymentInfoForm status={this.state.status} message={this.state.message}/>;
        break;
      case "review":
        page = <ReviewForm navigateTo={this.navigateTo}
                           creditCardBrand={this.state.creditCardBrand}
                           last4={this.state.last4}
                           patients={this.state.patients}
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
                <span className="signup-xs-text">(4/5) Payment</span>
                <span className="signup-xs-text">(5/5) Review</span>
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
