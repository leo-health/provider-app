var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form className="">
              <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
              <h6>Please enter your new password.</h6>
              <div className="alert alert-dismissible alert-danger">
                <button type="button" className="close" data-dismiss="alert">×</button>
                <a href="#" className="alert-link">Your passwords do not match.</a>
              </div>
              <fieldset>
                <div className="form-group has-error">
                  <input type="password" className="form-control" id="inputPassword" placeholder="New password"/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="reInputPassword" placeholder="Re-enter password"/>
                </div>
                <div className="form-group">
                  <div class="col-lg-8">
                    <button type="reset" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
});
