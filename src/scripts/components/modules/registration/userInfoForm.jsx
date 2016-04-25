var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
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

            <div className="col-md-3 col-md-offset-1">
              <a href="#" className="btn btn-primary" id="signup_continue" type="submit">Continue</a>
            </div>
          </div>
        </div>
    )
  }
});
