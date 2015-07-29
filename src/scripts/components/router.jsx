var React = require('react');
//# Assign React to Window so the Chrome React Dev Tools will work.
window.React = React;

var Router = require('react-router'),
    { Route, RouteHandler, Link, DefaultRoute, NotFoundRoute } = Router;

var App = require('./app'),
    Login = require('./pages/login'),
    Home = require('./pages/home'),
    ResetPassword = require('./pages/resetPassword'),
    ChangePassword = require('./pages/changePassword');

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="login" handler={Login}/>
    <Route name ="resetPassword" handler={ResetPassword} />
    <Route name ="changePassword" handler={ChangePassword} />
    <Route name="home" handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("container"));
});
