var React = require('react'),
    ErrorAlert = require('../alert/errorAlert'),
    FAQ = require('./faq'),
    EditGuardian = require('./guardian/editGuardian');

module.exports =React.createClass({
  handleOnSubmit: function (e) {
    this.refs.editGuardian.refs.component.handleOnSubmit();
  },

  render: function () {
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h4 className="signup-header">Tell us a little about yourself</h4>
            <p className="lead">We are thrilled to welcome you to the practice!
              We need to collect some information about you and your family in order to get you enrolled in the practice.
            </p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message} status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-1">
            <h5 className="signup-header">You</h5>
            <EditGuardian ref="editGuardian" insurers={this.props.insurers}/>
          </div>
          <br/>
          <div className="col-md-4 form-group">
            <button onClick={this.handleOnSubmit}
                    className="btn btn-lg btn-primary full-width-button">
              Continue
            </button>
            <br/><br/>
            <FAQ/>
          </div>
        </div>
      </div>
    )
  }
});
