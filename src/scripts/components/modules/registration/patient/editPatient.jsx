var React = require('react'),
    validation = require('react-validation-mixin'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    Helper = require('../../../../utils/registrationHelper'),
    _ = require('lodash'),
    Joi = require('joi'),
    DatePicker = require('react-datepicker'),
    moment = require('moment'),
    strategy = require('joi-validation-strategy');

require('react-datepicker/dist/react-datepicker.css');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: Helper.patientValidatorTypes,

  getValidatorData: function(){
    var data = $.extend({}, this.state);
    if (data.birthDate) data.birthDate = data.birthDate.format('MM-DD-YYYY');
    return data
  },

  getInitialState: function(){
    return this.getInitialPatient()
  },

  getInitialPatient: function(){
    if(this.props.patient){
      return {
        id: this.props.patient.id,
        firstName: this.props.patient.first_name,
        lastName: this.props.patient.last_name,
        sex: this.props.patient.sex,
        birthDate: moment(this.props.patient.birth_date),
        isCreate: false
      }
    }else{
      return { firstName: '', lastName: '', sex: 'M', birthDate: undefined, isCreate: true}
    }
  },

  handleFirstNameChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('firstName')();
    this.setState({firstName: e.target.value});
  },

  handleLastNameChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('lastName')();
    this.setState({lastName: e.target.value});
  },

  handleSexChange: function(e){
    this.setState({sex: e.target.value});
  },

  handleBirthDateChange: function(date){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('birthDate')();
    this.setState({birthDate: date});
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.state.isCreate ? this.createPatient() : this.updatePatient()
      }
    };
    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  patientParams: function(){
    return{
      id: this.state.id,
      authentication_token: sessionStorage.enrollmentToken,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      sex: this.state.sex,
      birth_date: this.state.birthDate
    }
  },

  createPatient: function(){
    RegistrationActions.createPatientEnrollmentRequest(this.patientParams())
  },

  updatePatient: function(){
    RegistrationActions.updatePatientEnrollmentRequest(this.patientParams())
  },

  render: function(){
    var showCancelButton = this.props.cancel ? {display: "inline-block"} : {display: "none"};

    return(
      <div className="row well">
        <div className="row">
          <div className="col-md-6">
            <input type="text"
                   className="form-control"
                   value={this.state.firstName}
                   onChange={this.handleFirstNameChange}
                   autoFocus/>
            <label className="text-muted">First Name</label>
            {Helper.renderHelpText(this.props.getValidationMessages('firstName'))}
          </div>

          <div className="col-md-6">
            <input type="text"
                   className="form-control"
                   value={this.state.lastName}
                   onChange={this.handleLastNameChange}/>
            <label className="text-muted">Last Name</label>
            {Helper.renderHelpText(this.props.getValidationMessages('lastName'))}
          </div>
          <a href="#" className="col-md-4" onClick={this.props.handleCancel} style={showCancelButton}>
            <span className="glyphicon glyphicon-trash pull-right"></span>
          </a>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <select className="form-control"
                    id="select"
                    value={this.state.sex}
                    onChange={this.handleSexChange}>
              <option value={"M"}>M</option>
              <option value={"F"}>F</option>
            </select>
            <label className="text-muted">Gender</label>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <DatePicker
                className="form-control"
                showYearDropdown
                selected={this.state.birthDate}
                onChange={this.handleBirthDateChange} />
                <br/>
            <label className="text-muted">Birth Date</label>
            {Helper.renderHelpText(this.props.getValidationMessages('birthDate'))}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-4">
            <button onClick={this.handleOnSubmit} className="btn btn-primary full-width-button">Done</button>
          </div>
        </div>
      </div>
    )
  }
}));
