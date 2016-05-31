var React = require('react'),
    Reflux = require('reflux'),
    RegistrationStore = require('../../../stores/registrationStore'),
    classNames = require('classnames'),
    moment = require('moment'),
    ErrorAlert = require('../alert/errorAlert'),
    EditPatient = require('./patient/editPatient'),
    SinglePatient = require('./patient/singlePatient');

module.exports = validation(strategy)(React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function(){
    return {
      edit: false,
      cancel: false,
      status: '',
      message: ''
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.patients.length > 0) this.setState({ edit: false, status: '' })
  },

  showPatients: function(){
    return this.props.patients.map(function(patient, i){
      return <SinglePatient key={i} patient={patient}/>;
    });
  },

  addPatient: function(){
    if(this.props.patients > 0 && !this.state.edit){
      return React.createElement('a',  {className: "col-md-1 col-md-offset-11", onClick: this.switchToEdit}, 'add')
    }else{
      return <EditPatient cancel={this.state.cancel} handleCancel={this.handleCancel}/>
    }
  },

  handleCancel: function(){
    this.setState({edit: false, cancel: false})
  },

  switchToEdit: function(){
    this.setState({edit: true, cancel: true})
  },

  handleContinue: function(){
    if(this.props.patients.length > 0){
      this.props.navigateTo('payment')
    }else{
      this.setState({message: "At least one child is required!", status: "error"})
    }
  },

  render: function(){
    var continueButtonClass = classNames({
      "btn btn-primary full-width-button": this.props.patients.length > 0,
      "btn btn-primary full-width-button disabled": this.props.patients < 1
    });

    return(
      <div>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h3 className="signup-header">Let's set up a profile for each of your children</h3>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.state.message}
                        status={this.state.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            {this.showPatients()}
            {this.addPatient()}
          </div>
          <div className="col-md-2">
            <button type="button"
                    onClick={this.handleContinue}
                    className={continueButtonClass}>
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }
}));
