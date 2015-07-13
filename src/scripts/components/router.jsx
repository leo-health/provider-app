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
    Home = require('./pages/home');

var routes = (
  <Route handler={Login}>
    <DefaultRoute handler={Home}/>
    <Route name="/#/login" path='login' handler={Login}/>
    <Route name="home" path='home' handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("container"));
});
