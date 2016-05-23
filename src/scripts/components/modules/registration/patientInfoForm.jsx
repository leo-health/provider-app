var React = require('react'),
    Reflux = require('reflux'),
    RegistrationStore = require('../../../stores/registrationStore'),
    classNames = require('classnames'),
    moment = require('moment'),
    SinglePatient = require('./patient/singlePatient');

module.exports = validation(strategy)(React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function(){
    return {patientEnrollment: [], edit: false}
  },

  componentWillReceiveProps: function(nextProps){
    if( nextProps.enrollment) this.setState({patientEnrollment: nextProps.enrollment.patient_enrollments, edit: false})
  },

  showPatients: function(){
    return this.state.patientEnrollment.map(function(patient, i){
      return <SinglePatient key={i} patient={patient}/>;
    });
  },

  addPatient: function(){
    if(this.state.patientEnrollment.length > 0 && !this.state.edit){
      return React.createElement('a',  {className: "col-md-1 col-md-offset-11", onClick: this.switchToEdit}, 'add')
    }else{
      return <SinglePatient/>;
    }
  },

  switchToEdit: function(){
    this.setState({edit: true})
  },

  render: function(){
    var continueButtonClass = classNames({
      "btn btn-primary full-width-button": this.state.patientEnrollment.length > 0,
      "btn btn-primary full-width-button disabled": this.state.patientEnrollment < 1
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
          <div className="col-md-8 col-md-offset-1">
            {this.showPatients()}
            {this.addPatient()}
          </div>
          <div className="col-md-2">
            <button type="button"
                    onClick={()=>this.props.navigateTo('payment')}
                    className={continueButtonClass}>
              Continue
            </button>
          </div>
        </div>
      </div>
    )
  }
}));
