var React = require('react'),
    ReactRouter = require('react-router'),
    {browserHistory, withRouter} = ReactRouter,
    _ = require('lodash'),
    RegistrationActions = require('../../../actions/registrationActions'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

module.exports = React.createClass({
  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone")
  },

  //getInitialState: function(){
  //  return {
  //    insurancePlanId: 1,
  //    firstName: "",
  //    lastName: "",
  //    phone: ""
  //  }
  //},

  setInsurancePlanId: function(e){
    this.setState({ insurancePlanId: Number(e.target.value) })
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var firstName = ReactDom.findDOMNode(this.refs.firstName).value.trim();
    var lastName = ReactDom.findDOMNode(this.refs.lastName).value.trim();
    var phone = ReactDom.findDOMNode(this.refs.phone).value.trim();
    RegistrationActions.updateEnrollmentRequest({
      authentication_token: sessionStorage.authenticationToken,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone: this.state.phone
    })
  },

  parseInsurers: function(){
    var plans = [];
    if( this.props.insurers.length > 0 ){
      _.each(this.props.insurers, function(insurer){
         _.each(insurer.insurance_plans, function(insurancePlan){
          plans.push(React.createElement('option',
              {key: insurancePlan.id, value: insurancePlan.id},
              insurer.insurer_name + ' ' +insurancePlan.plan_name))
        })
      });
    }
    return plans
  },

  render: function(){
    return(
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="body">
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Tell us about yourself!</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="col-sm-12">
                    <select className="form-control"
                            id="select"
                            onChange={this.setInsurancePlanId}
                        >
                      {this.parseInsurers()}
                    </select>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" ref="firstName"/>
                  </div>

                  <div className="form-group col-sm-6">
                    <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" ref="lastName"/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="text" className="form-control" id="inputPhone" placeholder="Phone" ref="phone"/>
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
  }
});
