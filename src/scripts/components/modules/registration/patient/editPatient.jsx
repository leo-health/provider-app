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
    birthDate: Joi.date().max(new Date()).required().label("Birth date")
  },

  getValidatorData: function(){
    return {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate: this.state.birthDate
    }
  },

  getInitialState: function(){
    return {
      firstName: '',
      lastName: '',
      sex: 'M',
      birthDate: ''
    }
  },

  handleFirstNameChange: function(e){
    this.props.handleValidation('firstName')();
    this.setState({firstName: e.target.value});
  },

  handleLastNameChange: function(e){
    this.props.handleValidation('lastName')();
    this.setState({lastName: e.target.value});
  },

  handleSexChange: function(e){
    this.setState({sex: e.target.value});
  },

  handleBirthDateChange: function(e){
    this.props.handleValidation('birthDate')();
    this.setState({birthDate: e.target.value});
  },


  handleOnSubmit: function(){
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        RegistrationActions.createPatientEnrollmentRequest(
          _.merge(this.state, {authentication_token: sessionStorage.enrollmentToken})
        );

        this.setState({firstName: '', lastName: '', sex: 'M', birthDate: ''})
      }
    };

    this.props.validate(onValidate);
  },

  onDrop: function (files) {
    console.log('Received files: ', files);
    //<img src={file.preview} />
  },

  renderHelpText: function(message){
    var messageClass = classNames({
      "text-danger": message.length > 0,
      "text-muted": message.length === 0
    });

    return <label className={messageClass}>{message}</label>
  },

  render: function(){
    return(
      <div className="row">
        <div className="form-group col-sm-2">
          <button className="btn btn-primary start full-width-button">
            <i className="glyphicon glyphicon-upload"></i><span>Start</span>
          </button>
        </div>

        <div className="form-group col-sm-2">
          <input type="text"
                 className="form-control"
                 value={this.state.firstName}
                 onChange={this.handleFirstNameChange}
                 autoFocus/>
          {this.renderHelpText(this.props.getValidationMessages('firstName'))}
          <label className="text-muted">First Name</label>
        </div>

        <div className="form-group col-sm-2">
          <input type="text"
                 className="form-control"
                 value={this.state.lastName}
                 onChange={this.handleLastNameChange}/>
          {this.renderHelpText(this.props.getValidationMessages('lastName'))}
          <label className="text-muted">Last Name</label>
        </div>

        <div className="form-group col-sm-2">
          <select className="form-control"
                  id="select"
                  value={this.state.sex}
                  onChange={this.handleSexChange}>
            <option value={"M"}>M</option>
            <option value={"F"}>F</option>
          </select>
          <label className="text-muted">Gender</label>
        </div>

        <div className="form-group col-sm-3">
          <input type="date"
                 className="form-control"
                 value={this.state.birthDate}
                 onChange={this.handleBirthDateChange}/>
          {this.renderHelpText(this.props.getValidationMessages('birthDate'))}
          <label className="text-muted">Birth Date</label>
        </div>

        <div className="form-group col-sm-1">
          <a href="#" onClick={this.handleOnSubmit}>Save</a>
        </div>
      </div>
    )
  }
}));
