var React = require('react'),
    ReactDom = require('react-dom'),
    Reflux = require('reflux'),
    ReactRouter = require('react-router'),
    {browserHistory, withRouter, } = ReactRouter,
    classNames = require('classnames'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    PaymentInfoForm = require('../modules/registration/paymentInfoForm'),
    RegistrationActions = require('../../actions/registrationActions'),
    RegistrationStore = require('../../stores/registrationStore'),
    EnrollmentForm = require('../modules/registration/enrollmentForm'),
    UserInfoForm = require('../modules/registration/userInfoForm');
    PatientInfoForm = require('../modules/registration/patientInfoForm');
    ProgressBarMap = {
      you: "21%",
      patient: "42%"
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
      page: "enroll",
      progressBar: "7%",
      insurers: []
    }
  },

  componentWillMount: function(){
    window.onbeforeunload = function(){
      return "You will lose all unsaved changes to your application."
    };

    RegistrationActions.fetchInsurersRequest()
  },

  onRegistrationStatusChange: function(status){
    if(status.enrollmentToken) sessionStorage['enrollmentToken'] = status.enrollmentToken;

    if(status.insurers) this.setState(status);

    if(status.nextPage){
      this.context.router.push({
        pathname: "/signup",
        query: {page: status.nextPage}
      });

      this.setState({
        page: status.nextPage,
        progressBar: ProgressBarMap[status.nextPage]
      })
    }
  },

  selectPage: function(){
    var page;
    switch(this.state.page){
      case "enroll":
        page = <EnrollmentForm setPage={this.setPage}/>;
        break;
      case "you":
        page = <UserInfoForm insurers={this.state.insurers}/>;
        break;
      case "patient":
        page = <PatientInfoForm/>;
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
                  <div className="signup-progress-text progress-text-container">Review</div>
                  <div className="progress-text-spacer"></div>
                  <div className="signup-progress-text progress-text-container">Payment</div>
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
