var React = require('react');
//# Assign React to Window so the Chrome React Dev Tools will work.
window.React = React;

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute

var App = require('./app');

var Login = require('./pages/login');
var Home = require('./pages/home');

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute handler={Login}/>
    <Route name="login" handler={Login}/>
    <Route name="home" handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("container"));
});
