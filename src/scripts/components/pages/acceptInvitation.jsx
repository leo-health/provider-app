var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Router = require('react-router');

var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');

module.exports = React.createClass({
  mixins: [ Router.Navigation, Reflux.listenTo(UserStore, 'onStatusChange') ],

  getInitialState: function(){
    return{ message: '' }
  },

  componentWillMount: function(){
    UserActions.signUpUser(this.context.router.getCurrentQuery().token);
  },

  onStatusChange: function (status) {
    if(status.sign_up){
      if(status.status == "ok"){
        this.setState({ message: <h5>Thank you for confirming this invitation.</h5>})
      }else{
        this.setState({ message: <h5>Oops, something went wrong :(</h5>})
      }
    }
  },

  render: function(){
    return(
      <div className="row">
        <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
          <div className="text-center">
            <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
            {this.state.message}
            <br/>
          </div>
        </div>
      </div>
    )
  }
});
