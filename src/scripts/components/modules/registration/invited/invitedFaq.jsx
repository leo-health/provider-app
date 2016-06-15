var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div id="accordion" role="tablist" aria-multiselectable="true" hide="false" className=".well.faq-well">
        <div>
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                What will I get as Leo member?
              </a></strong>
            </h4>
          </div>
          <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
            You will be able to use the iOS mobile app to securely message the practice, schedule appointments and view your child’s health record.  Additionally, you will be able to participate virtually in your child’s appointments, receive prescription deliveries directly to your door and access exclusive community events and content.
          </div>
        </div>
        <div>
          <div className="panel-heading" role="tab" id="headingTwo">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                How do I download the app?
              </a></strong>
            </h4>
          </div>
          <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
            To download the Leo app today, please enter the information below and from there you will be prompted to head over the the App Store.
          </div>
        </div>
      </div>
    )
  }
});
