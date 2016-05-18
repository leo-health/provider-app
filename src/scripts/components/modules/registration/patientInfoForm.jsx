var React = require('react'),
    Reflux = require('reflux'),
    ReactDom = require('react-dom'),
    RegistrationStore = require('../../../stores/registrationStore'),
    RegistrationActions = require('../../../actions/registrationActions'),
    classNames = require('classnames'),
    moment = require('moment'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    Patient = require('./patient');

module.exports = validation(strategy)(React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onStatusChange")
  ],

  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    birthDate: Joi.date().max(new Date()).required().label("Birth date")
  },

  getValidatorData: function(){
    return {
      firstName: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      lastName: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      birthDate: ReactDom.findDOMNode(this.refs.birthDate).value.trim()
    }
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.createPatientEnrollment()
        ReactDom.findDOMNode(this.refs.firstName).value = "";
        ReactDom.findDOMNode(this.refs.lastName).value = "";
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  createPatientEnrollment: function(){
    RegistrationActions.createPatientEnrollmentRequest({
      first_name: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      last_name: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      birth_date: ReactDom.findDOMNode(this.refs.birthDate).value.trim(),
      sex: this.state.sex,
      authentication_token: sessionStorage.enrollmentToken
    });
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

  renderHelpText: function(message){
    var messageClass = classNames({
      "text-danger": message.length > 0,
      "text-muted": message.length === 0
    });

    return <label className={messageClass}>{message}</label>
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
      <form className="" onSubmit={this.handleOnSubmit}>
        <div className="row">
          <div className="col-md-7 col-md-offset-1">
            <h3 className="signup-header">Let's set up a profile for each of your children</h3>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            {patients}
            <div className="row">
              <div className="form-group col-sm-3">
                <input type="text"
                       className="form-control"
                       ref="firstName"
                       autoFocus/>
                {this.renderHelpText(this.props.getValidationMessages('firstName'))}
                <label className="text-muted">First Name</label>
              </div>

              <div className="form-group col-sm-3">
                <input type="text"
                       className="form-control"
                       ref="lastName"/>
                {this.renderHelpText(this.props.getValidationMessages('lastName'))}
                <label className="text-muted">Last Name</label>
              </div>

              <div className="form-group col-sm-2">
                <select className="form-control"
                        id="select"
                        onChange={this.setPatientGender}>
                  <option value={"M"}>M</option>
                  <option value={"F"}>F</option>
                </select>
                <label className="text-muted">Gender</label>
              </div>

              <div className="row col-sm-4 form-group">
                <input type="date"
                       className="form-control"
                       placeholder="dd/mm/yyyy"
                       ref="birthDate"/>
                {this.renderHelpText(this.props.getValidationMessages('birthDate'))}
                <label className="text-muted">Birth Date</label>
              </div>
            </div>


            <div className="row">
              <div className="form-group col-sm-2 col-sm-offset-10">
                <button type="submit" className="btn btn-primary">Add</button>&nbsp;
              </div>
            </div>
          </div>

          <div className="col-md-2 form-group">
            <button type="button"
                    id="signup_continue"
                    onClick={()=>this.props.navigateTo('payment')}
                    className={continueButtonClass}>
              Continue
            </button>
          </div>
        </div>
      </form>
    )
  }
}));
