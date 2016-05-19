var React = require('react'),validation = require('react-validation-mixin'),
    RegistrationActions = require('../../../../actions/registrationActions'),
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
      firstName: ReactDom.findDOMNode(this.refs.firstName).value.trim(),
      lastName: ReactDom.findDOMNode(this.refs.lastName).value.trim(),
      birthDate: ReactDom.findDOMNode(this.refs.birthDate).value.trim()
    }
  },

  handleOnSubmit: function(){
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.createPatientEnrollment();
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
      sex: ReactDom.findDOMNode(this.refs.sex).value.trim(),
      authentication_token: sessionStorage.enrollmentToken
    });
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
                 ref="firstName"
                 autoFocus/>
          {this.renderHelpText(this.props.getValidationMessages('firstName'))}
          <label className="text-muted">First Name</label>
        </div>

        <div className="form-group col-sm-2">
          <input type="text"
                 className="form-control"
                 ref="lastName"/>
          {this.renderHelpText(this.props.getValidationMessages('lastName'))}
          <label className="text-muted">Last Name</label>
        </div>

        <div className="form-group col-sm-2">
          <select className="form-control"
                  id="select"
                  ref="sex">
            <option value={"M"}>M</option>
            <option value={"F"}>F</option>
          </select>
          <label className="text-muted">Gender</label>
        </div>

        <div className="form-group col-sm-3">
          <input type="date"
                 className="form-control"
                 ref="birthDate"/>
          {this.renderHelpText(this.props.getValidationMessages('birthDate'))}
          <label className="text-muted">Birth Date</label>
        </div>

        <div className="form-group col-sm-1">
          <a onClick={this.addPatient}>Save</a>
        </div>
      </div>
    )
  }
}));
