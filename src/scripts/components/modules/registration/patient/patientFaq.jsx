var React = require('react');
var classNames = require('classnames');

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
      'enable-overlay': this.state.clickedFAQ,
      'disable-overlay': !this.state.clickedFAQ
    });

    var overlayClass = classNames({
      'faq-overlay': true,
      'enable-overlay': this.state.clickedFAQ,
      'disable-overlay': !this.state.clickedFAQ
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
                  What if I am pregnant and my child is not born yet?
                </a></strong>
              </h4>
            </div>
            <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
              At this time you can only complete registration once  you give birth  Please come back when your child is born to complete registration and book your first appointment!
            </div>
          </div>
          <div className="">
            <div className="panel-heading" role="tab" id="headingTwo">
              <h4 className="panel-title">
                <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  I have one child now but expecting another, how will I add him/her?
                </a></strong>
              </h4>
            </div>
            <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
              First off, congratulations!  You can easily add children to your account after you register.  Simply go to the “Settings” in the app and click on “Add a Child”.
            </div>
          </div>
          <div className="">
            <div className="panel-heading" role="tab" id="headingThree">
              <h4 className="panel-title">
                <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  How secure is my family's information?
                </a></strong>
              </h4>
            </div>
            <div id="collapseThree" className="collapse panel-body" role="tabpanel" aria-labelledby="headingThree">
              Your family’s information, especially the health record, is secured and all of Leo’s technology is HIPAA compliant.
            </div>
          </div>
        </div>
      </div>
    )
  }
});
