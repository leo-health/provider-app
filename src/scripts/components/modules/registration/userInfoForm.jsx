var React = require('react'),
    ErrorAlert = require('../alert/errorAlert'),
    FAQ = require('./guardian/userFaq'),
    EditGuardian = require('./guardian/editGuardian');

module.exports = React.createClass({
  getInitialState: function(){
    return {disabled: false}
  },

  handleOnSubmit: function (e) {
    this.refs.editGuardian.refs.component.handleOnSubmit();
  },

  setDisableState: function(){
    this.setState({disabled: true})
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.status === "error" && this.state.disabled) this.setState({disabled: false})
  },

  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col-lg-11 col-lg-offset-1 signup-">
            <div className="registration-header mobile-only">REGISTRATION</div>
            <h4 className="signup-header">Tell us a little about yourself</h4>
            <p className="lead mobile-hidden">We are thrilled to welcome you to the Practice! To get your enrolled, we need to collect some info about you and your family.</p>
            <p className="lead mobile-only">To get you enrolled, we need to collect some info.</p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <ErrorAlert message={this.props.message} status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-1">
            <EditGuardian ref="editGuardian"
                          insurers={this.props.insurers}
                          setDisableState={this.setDisableState}/>
          </div>
          <div className="col-lg-4 form-group">
            <button onClick={this.handleOnSubmit}
                    disabled={this.state.disabled}
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
