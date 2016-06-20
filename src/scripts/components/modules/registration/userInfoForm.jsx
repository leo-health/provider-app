var React = require('react'),
    ErrorAlert = require('../alert/errorAlert'),
    FAQ = require('./guardian/userFaq'),
    EditGuardian = require('./guardian/editGuardian');

module.exports =React.createClass({
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
        <br/>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h4 className="signup-header">Tell us a little about yourself</h4>
            <p className="lead">We are thrilled to welcome you to the Practice! To get your enrolled, we need to collect some info about you and your family.
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
            <EditGuardian ref="editGuardian"
                          insurers={this.props.insurers}
                          setDisableState={this.setDisableState}/>
          </div>
          <div className="col-md-4 form-group">
            <button onClick={this.handleOnSubmit}
                    disabled={this.state.disabled}
                    className="btn btn-lg btn-primary full-width-button">
              Continue
            </button>
            <br/>
            <br/>
            <FAQ/>
          </div>
        </div>
      </div>
    )
  }
});
