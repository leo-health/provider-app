var React = require('react');
var classNames = require('classnames');
var MONTHLY_SUBSCRIPTION_PRICE = require('../../../../utils/constants.js').MONTHLY_SUBSCRIPTION_PRICE;

module.exports = React.createClass({
  getInitialState: function(){
    return {clickedFAQ: false}
  },

  onToggleFAQ: function() {
    this.setState({clickedFAQ: !this.state.clickedFAQ})
  },

  render: function() {
    var faqClass = classNames({
      'well faq-well': true,
      'enable-overlay': this.state.clickedFAQ
    });

    var overlayClass = classNames({
      'faq-overlay': true,
      'enable-overlay': this.state.clickedFAQ
    });

    return(
      <div>
        <div className="mobile-only mobile-faq"><strong onClick={this.onToggleFAQ}>FAQ</strong></div>
        <div className={overlayClass} onClick={this.onToggleFAQ}></div>
        <div id="accordion" role="tablist" aria-multiselectable="true" hide="false" className={faqClass}>
          <div className="">
            <div className="panel-heading" role="tab" id="headingOne">
              <h4 className="panel-title">
                <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  When will my card be charged?
                </a></strong>
              </h4>
            </div>
            <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
              Your card will charged monthly starting when you register.
            </div>
          </div>
          <div className="">
            <div className="panel-heading" role="tab" id="headingTwo">
              <h4 className="panel-title">
                <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Can I cancel my membership?
                </a></strong>
              </h4>
            </div>
            <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
              We hope you never have to leave us, but if you do, you can contact us at support@leohealth.com to cancel your subscription at anytime.
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
              No, you will only be charged ${MONTHLY_SUBSCRIPTION_PRICE}/month for each child. There are no hidden fees or charges.
            </div>
          </div>
          <div className="">
            <div className="panel-heading" role="tab" id="headingFour">
              <h4 className="panel-title">
                <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Can I pay the membership fee with my HSA/FSA savings card?</a></strong>
              </h4>
            </div>
            <div id="collapseFour" className="collapse panel-body" role="tabpanel" aria-labelledby="headingFour">You should be able to, but we cannot guarantee it. On occasion, our online payment processor (Stripe) declines HSA/FSA savings cards. However, in the event that occurs, we suggest that you pay with your personal credit card and we can provide you with a statement for possible reimbursement from your HSA/FSA savings account.</div>
          </div>
        </div>
      </div>
    )
  }
});
