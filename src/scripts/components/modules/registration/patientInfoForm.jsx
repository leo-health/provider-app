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

  getInitialState: function(){

  },

  render: function(){
    return(
        <div className="body">
          <form className="" onSubmit={this.handleOnSubmit}>
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Let's set up a profile for each of your children</h3>
              </div>
            </div>
            <br/>
            <div className="row">
              <!--here is the place for static form-->

              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="form-group col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="inputFirstName"
                           placeholder="First Name"
                           ref="firstName"
                           required
                           autoFocus/>
                  </div>

                  <div className="form-group col-sm-6">
                    <input type="text"
                           className="form-control"
                           id="inputLastName"
                           placeholder="Last Name"
                           ref="lastName"
                           required/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-6">
                    <select className="form-control" id="select">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="form-group col-sm-6">
                    <input type="text" className="form-control" id="inputPhone" placeholder="Phone" ref="phone"/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-2 col-sm-offset-10">
                    <button type="submit" id="signup_continue" className="btn btn-primary">Add</button>&nbsp;
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <button type="submit" id="signup_continue" className="btn btn-primary">Continue</button>&nbsp;
                </div>
              </div>
            </div>
          </form>
        </div>
    )
  }
});
