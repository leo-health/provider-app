var React = require('react');
var ReactDom = require('react-dom');
//# Assign React to Window so the Chrome React Dev Tools will work.
window.React = React;

var Router = require('react-router'),
    { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = Router;

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
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="login" handler={Login}/>
    <Route name ="resetPassword" handler={ResetPassword} />
    <Route name ="changePassword" handler={ChangePassword} />
    <Route name ="registration" handler={Registration} />
    <Route name ="registration/completed" handler={SecondaryUserSuccess} />
    <Route name ="acceptInvitation" handler={AcceptInvitation} />
    <Route name="home" handler={Home}/>
    <Route name="terms" handler={Terms}/>
    <Route name="privacy" handler={Privacy}/>
    <Route name="invalid-device" handler={DeepLink}/>
    <Route name="success" handler={Success}/>
    <NotFoundRoute handler={FourOhFour} />
  </Route>
);

Router.run(routes, function (Handler) {
  ReactDom.render(<Handler/>, document.getElementById("container"));
});
