var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <footer>
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-unstyled">
                <li className="pull-right medium-font-size feedback"><a href="mailto:support@leohealth.com">Feedback?</a></li>
                <li><span className="medium-font-size">Need help? Call (206) 819-8549</span></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
});
