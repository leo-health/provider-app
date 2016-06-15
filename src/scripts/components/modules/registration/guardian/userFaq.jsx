var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div id="accordion" role="tablist" aria-multiselectable="true" hide="false">
        <div className="">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                My spouse and I are both actively involved in managing our child’s care, who should register?
              </a></strong>
            </h4>
          </div>
          <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
            Not to worry, once you complete registration you’ll be able to invite another guardian or caregiver to have access to the account.  So, continue on with registration and you can add your spouse at the end (at no cost!).           </div>
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
            Its up to you!  There are many features of Leo that do not involve the iPhone app.  However, the majority of the features of the practice like messaging and scheduling are only available on the iPhone app currently.  Hopefully we will have an Andriod app soon.
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
            No, not quite yet.  Currently this is our only practice so you’ll only be able to enjoy all of the awesome Leo feature at this practice.  However, go here and let us know you are interested in Leo in another location.
          </div>
        </div>
      </div>
    )
  }
});
