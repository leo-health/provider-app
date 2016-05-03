var React = require('react'),
    Reflux= require('reflux'),
    ReactDom = require('react-dom'),
    ReactRouter = require('react-router'),
    {browserHistory, withRouter} = ReactRouter,
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    RegistrationActions = require('../../../actions/registrationActions'),
    RegistrationStore = require('../../../stores/registrationStore');

module.exports = withRouter(React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onRegistrationStatusChange")
  ],

  contextTypes: {
    router: React.PropTypes.object
  },

  onRegistrationStatusChange: function(status){
    if(status.nextPage) this.context.router.push({
      pathname: "signup/?page=you"
    });
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var email = ReactDom.findDOMNode(this.refs.email).value.trim();
    var password = ReactDom.findDOMNode(this.refs.password).value.trim();
    RegistrationActions.createEnrollmentRequest({
      email: email, password: password
    });

    //const onValidate = (error) => {
    //  if(error) return;
    //  RegistrationActions.createEnrollmentRequest(this.state)
    //};
    //this.props.validate(onValidate);
    //this.submitHasBeenAttemptedOnce = true;
  },

  componentWillMount: function() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  },

  routerWillLeave: function(nextLocation) {
    return 'Your work is not saved! Are you sure you want to leave?'
  },

  render: function(){
    return(
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="body">
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Let's get started</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email"/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password"/>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <button type="submit" id="signup_continue" className="btn btn-primary">Continue</button>&nbsp;
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }})
);
