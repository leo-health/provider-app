var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div id="accordion" role="tablist" aria-multiselectable="true" hide="false" className="well faq-well">
        <div className="">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                When will my card be charged?
              </a></strong>
            </h4>
          </div>
          <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
            Your card will charged at this time each month.  So, if you complete registration on the 12th that is the start of your billing cycle and you’ll be charged again 30 days later.
          </div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingTwo">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Is there a cancellation policy?
              </a></strong>
            </h4>
          </div>
          <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
            We hope you never have to leave us but if you do you can contact us at support@leohealth.com to cancel your account at anytime.
          </div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingThree">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Are there any other charges I should know about?
              </a></strong>
            </h4>
          </div>
          <div id="collapseThree" className="collapse panel-body" role="tabpanel" aria-labelledby="headingThree">
            No, all you will be charged for is $20/month per child. There are no other hidden fees or charges.
          </div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingFour">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseThree">Can I pay the membership fee with my HSA/FSA savings card?</a></strong>
            </h4>
          </div>
          <div id="collapseFour" className="collapse panel-body" role="tabpanel" aria-labelledby="headingFour">You should be able to, but we cannot guarantee it. On occasion, our online payment processor (Stripe) declines HSA/FSA savings cards. However, in the event that occurs, we suggest that you pay with your personal credit card and we can provide you with a statement for possible reimbursement from your HSA/FSA savings account.</div>
        </div>
      </div>
    )
  }
});
