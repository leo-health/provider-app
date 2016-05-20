var React = require('react'),
    Reflux = require('reflux'),
    RegistrationStore = require('../../../stores/registrationStore'),
    classNames = require('classnames'),
    moment = require('moment'),
    EditPatient = require('./patient/editPatient'),
    ShowPatient = require('./patient/showPatient');

module.exports = validation(strategy)(React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onStatusChange")
  ],

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function(){
     return({
      patientEnrollment: []
    })
  },

  onStatusChange: function(status){
    if(status.patientEnrollment){
      this.setState({
        patientEnrollment: this.state.patientEnrollment.concat(status.patientEnrollment)
      })
    }
  },

  render: function(){
    var patients = this.state.patientEnrollment.map(function(patient, i){
      return(
        <showPatient key={i} patient={patient}/>
      )
    });

    var continueButtonClass = classNames({
      "btn btn-primary": this.state.patientEnrollment.length > 0,
      "btn btn-primary disabled": this.state.patientEnrollment < 1
    });

    return(
      <div className="row">
        <div className="col-md-11 col-md-offset-1">
          <h3 className="signup-header">Let's set up a profile for each of your children</h3>
        </div>

        <br/>

        <div className="row">
          <div className="col-md-9 col-md-offset-1">
            {patients}
            <EditPatient/>
          </div>

          <div className="col-md-2">
            <button type="button full-width-button"
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
