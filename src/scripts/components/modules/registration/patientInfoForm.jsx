var React = require('react');
var validation = require('react-validation-mixin');

module.exports = React.createClass({
  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone"),
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    var email = ReactDom.findDOMNode(this.refs.email).value.trim();
  },

  render: function(){
    return(
        <div className="body">
          <form className="" onSubmit={this.handleOnSubmit}>
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Let's set up a profile for your children</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="form-group col-sm-6">
                    <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" ref="firstName"/>
                  </div>

                  <div className="form-group col-sm-6">
                    <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" ref="lastName"/>
                  </div>
                </div>

                <div className="row">
                  <select className="form-control" id="select">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="text" className="form-control" id="inputPhone" placeholder="Phone" ref="phone"/>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-md-offset-1">
                <a href="#" className="btn btn-primary" id="signup_continue" type="submit">Continue</a>
              </div>
            </div>
          </form>
        </div>
    )
  }
});
