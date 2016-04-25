var React = require('react');

module.exports = React.createClass({
  handleOnSubmit: function(e){
    e.preventDefault();
  },

  render: function(){
    return(
        <div>
          <form onSubmit={this.handleOnSubmit}>
            <div className="body">
              <div className="row">
                <div className="col-md-7 col-md-offset-1">
                  <h3 className="signup-header">Invite Another Guardian</h3>
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
                    <div className="form-group col-sm-6">
                      <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" ref="firstName"/>
                    </div>

                    <div className="form-group col-sm-6">
                      <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" ref="lastName"/>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-md-offset-1">
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
