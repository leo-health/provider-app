var React = require('react'),
    ReactDom = require('react-dom'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory, withRouter} = ReactRouter,
    classNames = require('classnames'),
    _ = require('lodash'),
    RegistrationStore = require('../../stores/registrationStore'),
    UserInfoForm = require('../modules/registration/userInfoForm'),
    PatientInfoForm = require('../modules/registration/patientInfoForm'),
    PaymentInfoForm = require('../modules/registration/paymentInfoForm'),
    ReviewForm = require('../modules/registration/reviewForm'),
    ProgressBarMap = {
      you: ["12%", "1/4", "About You"],
      patient: ["36%", "2/4", "Add a Child"],
      payment: ["62%", "3/4", "Payment"],
      review: ["90%", "4/4", "Review"]
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
      nextPage: 'you',
      progressBar: ProgressBarMap.you,
      status: '',
      message: ''
    }
  },

  componentDidMount: function(){
    Stripe.setPublishableKey(leo.STRIPE_KEY);
    if(PRODUCTION){
      fbq('init', '255223491501781');
      fbq('track', "PageView");
    }
    ReactDom.findDOMNode(this.refs.signUp).scrollTop = 0
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
    if(status.nextPage) this.navigateTo(status.nextPage);
    if(status.createdSubscription){
      this.context.router.push({pathname: "/registration/success", query: {token: sessionStorage.enrollmentToken}});
      if(PRODUCTION){
        var value = parseInt(status.quantity) * 20;
        fbq('track', 'Purchase', {value: value.toString(), currency: 'USD'});
      }
    }
  },

  replacePatient: function(patients, newPatient){
    return _.map(patients, function(patient){ return (patient.id === newPatient.id) ? newPatient : patient })
  },

  navigateTo: function(destination){
    this.context.router.push({
      pathname: "/registration",
      query: {page: destination}
    });

    this.setState({
      status: '',
      message: '',
      progressBar: ProgressBarMap[destination],
      nextPage: destination
    });

    return false;
  },

  componentWillUnmount: function(){
    window.onbeforeunload = null;
    sessionStorage.removeItem('enrollmentToken');
  },

  onPatientError: function(){
    this.setState({
      status: "error", message: "To join Leo, you need to have at least one child!"
    })
  },

  selectPage: function(){
    var page;
    switch(this.state.nextPage){
      case "you":
        page = <UserInfoForm status={this.state.status} message={this.state.message}/>;
        if(PRODUCTION) ga('send', 'event', 'Registration', 'page-view', 'About-you_page-viewed');
        break;
      case "patient":
        page = <PatientInfoForm navigateTo={this.navigateTo}
                                patients={this.state.patients}
                                enrollment={this.state.enrollment}/>;
        if(PRODUCTION) ga('send', 'event', 'Registration', 'page-view', 'Add-child_page-viewed');
        break;
      case "payment":
        page = <PaymentInfoForm status={this.state.status} message={this.state.message}/>;
        if(PRODUCTION) ga('send', 'event', 'Registration', 'page-view', 'Payment_page-viewed');
        break;
      case "review":
        page = <ReviewForm creditCardBrand={this.state.creditCardBrand}
                           creditCardToken={this.state.creditCardToken}
                           last4={this.state.last4}
                           status={this.state.status}
                           message={this.state.message}
                           patients={this.state.patients}
                           onPatientError={this.onPatientError}
                           enrollment={this.state.enrollment}/>;
        if(PRODUCTION) ga('send', 'event', 'Registration', 'page-view', 'Review_page-viewed');
        break;
      default:
        page = <UserInfoForm status={this.state.status} message={this.state.message}/>;
        break;
    }
    return page
  },

  render: function(){
    return(
      <div id="signup_page" ref='signUp'>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <img src="/images/leo.png" alt="Leo Logo" id="signup_logo"/>
            <div id="signup_progress">
              <div className="progress-text" id="progress_xs">
                <p className="signup-progress-text progress-text-container">({this.state.progressBar[1]}) {this.state.progressBar[2]}</p>
              </div>
              <div className="progress-text" id="progress">
                <div className="progress-table">
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">{ProgressBarMap.you[2]}</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">{ProgressBarMap.patient[2]}</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">{ProgressBarMap.payment[2]}</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">{ProgressBarMap.review[2]}</div>
                </div>
                <div className="progress progress-table">
                  <div className="progress-bar" style={{width: this.state.progressBar[0]}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div id="signup_content">
            {this.selectPage()}
          </div>
        </div>
      </div>
    )
  }
});
