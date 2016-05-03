var React = require('react');
var validation = require('react-validation-mixin');
var Joi = require('joi');
var strategy = require('joi-validation-strategy');

module.exports = React.createClass({
  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone"),
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var email = ReactDom.findDOMNode(this.refs.email).value.trim();
    var email = ReactDom.findDOMNode(this.refs.email).value.trim();
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
                  <div className="form-group col-sm-12">
                    <input type="text" className="form-control" id="inputInsurer" placeholder="Insurer" ref="insurer"/>
                  </div>
                </div>

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
