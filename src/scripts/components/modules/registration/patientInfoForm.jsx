var React = require('react'),
    Reflux = require('reflux'),
    ReactDom = require('react-dom'),
    RegistrationStore = require('../../../stores/registrationStore'),
    RegistrationActions = require('../../../actions/registrationActions'),
    classNames = require('classnames'),
    moment = require('moment'),
    Patient = require('./patient');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onStatusChange")
  ],

  contextTypes: {
    router: React.PropTypes.object
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    RegistrationActions.createPatientEnrollmentRequest({
      first_name: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      last_name: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      birth_date: ReactDom.findDOMNode(this.refs.birthDate).value.trim(),
      sex: this.state.sex,
      authentication_token: sessionStorage.enrollmentToken
    });
    ReactDom.findDOMNode(this.refs.firstName).value = "";
    ReactDom.findDOMNode(this.refs.lastName).value = "";
  },

  getInitialState: function(){
    return({
      patientEnrollment: [],
      sex: "M"
    })
  },

  onStatusChange: function(status){
    if(status.patientEnrollment){
      this.setState({
        patientEnrollment: this.state.patientEnrollment.concat(status.patientEnrollment)
      })
    }
  },

  setPatientGender: function(e){
    this.setState({
      sex: e.target.value
    })
  },

  render: function(){
    var patients = this.state.patientEnrollment.map(function(patient, i){

      return(
        <Patient key={i}
                 firstName={patient.first_name}
                 lastName={patient.last_name}
                 sex={patient.sex}
                 birthDate={patient.birth_date.substring(0,10)}/>
      )
    });

    var continueButtonClass = classNames({
      "btn btn-primary": this.state.patientEnrollment.length > 0,
      "btn btn-primary disabled": this.state.patientEnrollment < 1
    });

    return(
      <div className="body">
        <form className="" onSubmit={this.handleOnSubmit}>
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <h3 className="signup-header">Let's set up a profile for each of your children</h3>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-7 col-md-offset-1">
              <div className="row">
                <div className="form-group col-sm-3">
                  <label className="text-muted">First Name</label>
                </div>
                <div className="form-group col-sm-3">
                  <label className="text-muted">Last Name</label>
                </div>
                <div className="form-group col-sm-3">
                  <label className="text-muted">Gender</label>
                </div>
                <div className="form-group col-sm-3">
                  <label className="text-muted">Birth Date</label>
                </div>
              </div>
              <br/>
              {patients}
              <div className="row">
                <div className="form-group col-sm-3">
                  <input type="text"
                         className="form-control"
                         ref="firstName"
                         required
                         autoFocus/>
                </div>

                <div className="form-group col-sm-3">
                  <input type="text"
                         className="form-control"
                         ref="lastName"
                         required/>
                </div>

                <div className="form-group col-sm-3">
                  <select className="form-control"
                          id="select"
                          onChange={this.setPatientGender}>
                    <option value={"M"}>Boy</option>
                    <option value={"F"}>Girl</option>
                  </select>
                </div>

                <div className="row col-sm-3 form-group">
                  <input type="date"
                         className="form-control"
                         placeholder="dd/mm/yyyy"
                         ref="birthDate"
                         required/>
                </div>
              </div>


              <div className="row">
                <div className="form-group col-sm-2 col-sm-offset-10">
                  <button type="submit" className="btn btn-primary">Add</button>&nbsp;
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <button type="button"
                        onClick={()=>this.props.navigateTo('payment')}
                        className={continueButtonClass}>
                  Continue
                </button>&nbsp;
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
});
