var React = require('react'),validation = require('react-validation-mixin'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    _ = require('lodash'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    Dropzone = require('react-dropzone');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    birthDate: Joi.date().max(new Date()).required().label("Birth Date")
  },

  getValidatorData: function(){
    return this.state
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
        birthDate: this.props.patient.birth_date.substring(0,10),
        isCreate: false
      }
    }else{
      return { firstName: '', lastName: '', sex: 'M', birthDate: '', isCreate: true}
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

  handleBirthDateChange: function(e){
    if(this.submitHasBeenAttemptedOnce) this.props.handleValidation('birthDate')();
    this.setState({birthDate: e.target.value});
  },

  handleOnSubmit: function(){
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

  onDrop: function (files) {
    console.log('Received files: ', files);
  },

  renderHelpText: function(message){
    var messageClass = classNames({
      "text-danger": message.length > 0,
      "text-muted": message.length === 0
    });

    return <label className={messageClass}>{message}</label>
  },

  render: function(){
    var showCancelButton = this.props.cancel ? {display: "inline-block"} : {display: "none"};

    return(
      <div className="row">
        <div className="form-group col-md-11">
          <div className="row">
            <div className="col-md-2">
              <img src="../images/camera@1x.png"/>
            </div>

            <div className="col-md-2">
              <input type="text"
                     className="form-control"
                     value={this.state.firstName}
                     onChange={this.handleFirstNameChange}
                     autoFocus/>
              <label className="text-muted">First Name</label>
              {this.renderHelpText(this.props.getValidationMessages('firstName'))}
            </div>

            <div className="col-md-2">
              <input type="text"
                     className="form-control"
                     value={this.state.lastName}
                     onChange={this.handleLastNameChange}/>
              <label className="text-muted">Last Name</label>
              {this.renderHelpText(this.props.getValidationMessages('lastName'))}
            </div>

            <div className="col-md-2">
              <select className="form-control"
                      id="select"
                      value={this.state.sex}
                      onChange={this.handleSexChange}>
                <option value={"M"}>M</option>
                <option value={"F"}>F</option>
              </select>
              <label className="text-muted">Gender</label>
            </div>

            <div className="col-md-4">
              <input type="date"
                     className="form-control"
                     value={this.state.birthDate}
                     onChange={this.handleBirthDateChange}/>
              <label className="text-muted">Birth Date</label>
              {this.renderHelpText(this.props.getValidationMessages('birthDate'))}
            </div>
          </div>
        </div>

        <div className="form-group col-md-1">
          <a href="#" onClick={this.handleOnSubmit}>S</a>
          <a href="#" onClick={this.props.handleCancel} style={showCancelButton}>C</a>
        </div>
      </div>
    )
  }
}));
