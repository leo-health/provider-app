var React = require('react'),
    ErrorAlert = require('../alert/errorAlert'),
    EditGuardian = require('./guardian/editGuardian');

module.exports =React.createClass({
  handleOnSubmit: function (e) {
    this.refs.editGuardian.refs.component.handleOnSubmit();
  },

  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h3 className="signup-header">Tell us about yourself!</h3>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.errorMessage}
                        status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            <EditGuardian ref="editGuardian" insurers={this.props.insurers}/>
          </div>

          <div className="col-md-2 form-group">
            <button onClick={this.handleOnSubmit}
                    className="btn btn-primary full-width-button">
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }
});
