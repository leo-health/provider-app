var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <footer>
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-unstyled">
                <li className="pull-right"><a href="#top">Back to top</a></li>
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
