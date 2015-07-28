var React = require('react');
//# Assign React to Window so the Chrome React Dev Tools will work.
window.React = React;

var Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    RouteHandler = Router.RouteHandler,
    NotFoundRoute = Router.NotFoundRoute,
    Link = Router.Link;

var App = require('./app'),
    Login = require('./pages/login'),
    Home = require('./pages/home'),
    ResetPassword = require('./pages/resetPassword'),
    ChangePassword = require('./pages/changePassword');

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="login" path='login' handler={Login}/>
    <Route name ="resetPassword" path="password_reset" handler={ResetPassword} />
    <Route name ="changePassword" path="password_change" handler={ChangePassword} />
    <Route name="home" path='home' handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById("container"));
});
