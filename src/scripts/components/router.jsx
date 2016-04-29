var React = require('react');
var ReactDom = require('react-dom'),
    { render } = ReactDom;
var ReactRouter = require('react-router'),
    {Router, Route, browserHistory, IndexRoute} = ReactRouter;

window.React = React;

var App = require('./app'),
    Login = require('./pages/login'),
    Home = require('./pages/home'),
    ResetPassword = require('./pages/resetPassword'),
    ChangePassword = require('./pages/changePassword'),
    Registration = require('./pages/registration'),
    SecondaryUserSuccess = require('./pages/secondaryUserSignUp'),
    AcceptInvitation = require('./pages/acceptInvitation'),
    Terms = require('./pages/terms'),
    Privacy = require('./pages/privacy'),
    FourOhFour = require('./pages/404'),
    DeepLink = require('./pages/deepLinkWarning'),
    Success = require('./pages/success');

var routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login}/>
      <Route path ="resetPassword" component={ResetPassword} />
      <Route path ="changePassword" component={ChangePassword} />
      <Route path ="registration" component={Registration} />
      <Route path ="registration/completed" component={SecondaryUserSuccess} />
      <Route path ="acceptInvitation" component={AcceptInvitation} />
      <Route path="home" component={Home}/>
      <Route path="terms" component={Terms}/>
      <Route path="privacy" component={Privacy}/>
      <Route path="invalid-device" component={DeepLink}/>
      <Route path="success" component={Success}/>
      <Route path="*" component={FourOhFour}/>
    </Route>
  </Router>
);

render(<Router>{routes}</Router>, document.getElementById("container"));

