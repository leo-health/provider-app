var React = require('react'),
    Reflux = require('reflux'),
    RegistrationStore = require('../../../stores/registrationStore'),
    classNames = require('classnames'),
    moment = require('moment'),
    ErrorAlert = require('../alert/errorAlert'),
    EditPatient = require('./patient/editPatient'),
    FAQ = require('./faq'),
    SinglePatient = require('./patient/singlePatient');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function(){
    return { edit: false, cancel: false, status: '', message: '' }
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
    if(this.props.patients.length > 0 && !this.state.edit){
      return <div className="row"><button className="btn btn-primary col-lg-3" onClick={this.switchToEdit}>Add Another</button></div>
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
        <br/>
        <div className="col-lg-11 col-lg-offset-1">
          <h4 className="signup-header">Now it’s time to add children to your account</h4>
          <p className="lead">If you’re an expecting parent, you won’t be able to enroll with Leo until your child is born.</p>
        </div>
        <div className="inline-hr"></div>
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <ErrorAlert message={this.state.message}
                        status={this.state.status}/>
          </div>
        </div>
        <div className="row">
          <br/>
          <div className="col-lg-6 col-lg-offset-1">
            {this.showPatients()}
            {this.addPatient()}
          </div>
          <div className="col-lg-4">
            <button type="button"
                    onClick={this.handleContinue}
                    className={continueButtonClass}>
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
