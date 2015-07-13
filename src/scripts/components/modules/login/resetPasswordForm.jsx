var React = require('React');

module.exports = React.createClass({
  render: function(){
    return(
      <div class="container page-header">
        <div class="row">
          <div class="col-xs-offset-4 col-lg-4 col-xs-offset-4 jumbotron text-center">
            <form class="">
              <a href="../" class=""><img src="/images/leo.png" alt="..." /></a>
              <h6>Please enter your @leohealth.com e-mail address and we will send you a link to reset your password right away!</h6>
              <fieldset>
                <div class="form-group">
                  <input type="text" class="form-control" id="inputEmail" placeholder="Email"/>
                </div>
                <div class="form-group">
                  <div class="col-lg-8">
                    <button type="submit" class="btn btn-primary">Sumbit</button>
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
                <li><a href="https://github.com/le0-health">GitHub</a></li>
                <li><a href="../help/#support">Support</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
});
