var React = require('react'),
    ReactDom = require('react-dom'),
    {render} = ReactDom,
    ReactRouter = require('react-router'),
    {Router, Route, browserHistory, IndexRoute } = ReactRouter,
    SessionStore = require('../stores/sessionStore'),
    App = require('./app'),
    Login = require('./pages/login'),
    Home = require('./pages/home'),
    ResetPassword = require('./pages/resetPassword'),
    ChangePassword = require('./pages/changePassword'),
    Invite = require('./pages/invite'),
    SecondaryUserSuccess = require('./pages/secondaryUserSignUp'),
    AcceptInvitation = require('./pages/acceptInvitation'),
    Terms = require('./pages/terms'),
    Privacy = require('./pages/privacy'),
    FourOhFour = require('./pages/404'),
    DeepLink = require('./pages/deepLinkWarning'),
    EmailSuccess = require('./modules/registration/emailSuccess'),
    RegistrationSuccess = require('./modules/registration/registrationSuccess'),
    Registration = require('./pages/registration');

window.React = React;

var requireAuth = function(nextState, replace, callback) {
  var hash = window.location.href.split('#/')[1];
  if( hash === 'privacy' || hash === 'terms'){
    replace('/' + hash); callback()
  } else if(!sessionStorage.authenticationToken){
    replace('/login'); callback()
  } else{
    SessionStore.isLoggedIn(nextState, replace, callback)
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth}/>
      <Route path="login" component={Login}/>
      <Route path ="resetPassword" component={ResetPassword}/>
      <Route path ="changePassword" component={ChangePassword}/>
      <Route path="home" component={Home} onEnter={requireAuth}/>
      <Route path="terms" component={Terms}/>
      <Route path="privacy" component={Privacy}/>
      <Route path="invalid-device" component={DeepLink}/>
      <Route path="email/success" component={EmailSuccess}/>
      <Route path="registration" component={Registration}/>
      <Route path="registration/success" component={RegistrationSuccess}/>
      <Route path ="registration/invited" component={Invite}/>
      <Route path ="registration/invited/success" component={SecondaryUserSuccess}/>
      <Route path ="registration/acceptInvitation" component={AcceptInvitation}/>
      <Route path="*" component={FourOhFour}/>
    </Route>
  </Router>
), document.getElementById("container"));
