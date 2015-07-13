var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
      <div class="container page-header">
        <div class="row">
          <div class="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form class="">
              <a href="../" class=""><img src="../images/leo.png" alt="..." /></a>
              <h6>Please enter your new password.</h6>
              <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">×</button>
                <a href="#" class="alert-link">Your passwords do not match.</a>
              </div>
              <fieldset>
                <div class="form-group has-error">
                  <input type="password" class="form-control" id="inputPassword" placeholder="New password"/>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" id="reInputPassword" placeholder="Re-enter password"/>
                </div>
                <div class="form-group">
                  <div class="col-lg-8">
                    <button type="reset" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <footer>
          <div class="row">
            <div class="col-lg-12">
              <ul class="list-unstyled">
                <li class="pull-right"><a href="#top">Back to top</a></li>
                <li><a href="https://twitter.com/leo4kids">Twitter</a></li>
                <li><a href="https://github.com/leo-health">GitHub</a></li>
                <li><a href="../help/#support">Support</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
});
