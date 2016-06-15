var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <div id="accordion" role="tablist" aria-multiselectable="true" hide="false" className="panel panel-body">
        <div className="">
          <div className="panel-heading" role="tab" id="headingOne">
            <h4 className="panel-title">
              <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                What if my child is not born yet?
              </a></strong>
            </h4>
          </div>
          <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
            Currently you can only complete registration when your child is born because you need to be able to enter in the actual birth date of your child.  Please come back when your child is born to complete registration and book your first appointment!
          </div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingTwo">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                How secure is my family's information?
              </a></strong>
            </h4>
          </div>
          <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
            Your family’s informations especially health record is secured and all technology is HIPAA compliant.
          </div>
        </div>
        <div className="">
          <div className="panel-heading" role="tab" id="headingThree">
            <h4 className="panel-title">
              <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                I have one child now but expecting another, how will I add him/her?
              </a></strong>
            </h4>
          </div>
          <div id="collapseThree" className="collapse panel-body" role="tabpanel" aria-labelledby="headingThree">
            First off, congratulations!  You can easily add children to your account after you register.  You just go to settings from the app and click on “Add a Child”.  When you add another child to your account your cost goes up by $20/month.
          </div>
        </div>
      </div>
    )
  }
});
