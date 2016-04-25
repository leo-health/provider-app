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
  }
});
