var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
      <div className="page-header row">
        <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4">
            <div className="text-center"><img src="../../images/leo.png"/>
              <h3>E-mail Confirmed</h3>
              <p className="lead">Thank you for confirming your e-mail address. If you have any questions or need assistance feel free to reach out to us at support@leohealth.com.</p>
              <a href="https://itunes.apple.com/app/id1051397244" target="_blank"><img className="lead" src="../images/download.png"/></a>
            </div>
        </div>
      </div>
    )
  }
});
