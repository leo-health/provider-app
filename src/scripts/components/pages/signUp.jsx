var React = require('react'),
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
      you: ["12%", "1/4", "Personal Information"],
      patient: ["40%", "2/4", "Add a Child"],
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
        page = <UserInfoForm status={this.state.status}
                             message={this.state.message}/>;
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
                <span className="signup-xs-text">({this.state.progressBar[1]}) {this.state.progressBar[2]}</span>
              </div>
              <div className="progress-text" id="progress">
                <div className="progress-table">
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
            <PatientInfoForm navigateTo={this.navigateTo}
                             patients={this.state.patients}
                             enrollment={this.state.enrollment}/>
          </div>
        </div>
      </div>
    )
  }
});
