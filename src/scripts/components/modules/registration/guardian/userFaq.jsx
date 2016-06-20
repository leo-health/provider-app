var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div id="accordion" role="tablist" aria-multiselectable="true" hide="false" className="well faq-well">
        <div className="">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                My spouse and I are both actively involved in managing our child’s care, will we both have access to this account?
              </a></strong>
            </h4>
          </div>
          <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">Yes, you will be both be able to access this account. Once you complete registration you’ll be able to invite your spouse or another guardian to your access.</div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingTwo">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Should I still register if I don’t have a iPhone?
              </a></strong>
            </h4>
          </div>
          <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
            It's up to you.  While there are many features of Leo that do not involve the iPhone app, many features, like messaging and scheduling, are only currently available on the iPhone app.  We hope to have an Android app soon.
          </div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingThree">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Should I still register if I don’t plan on coming to Flatiron Pediatrics in NYC?
              </a></strong>
            </h4>
          </div>
          <div id="collapseThree" className="collapse panel-body" role="tabpanel" aria-labelledby="headingThree">
            No, not quite yet. We are currently operating only out of our Flatiron practice in NYC. If you are interested in our offering but can’t make it to our practice, help us select our next location by going <a href="http://www.leohealth.com/practice" target="_blank">here</a> and let us know where you’d like to see us next.
          </div>
        </div>
      </div>
    )
  }
});
