var React = require('react'),
    ReactDom = require('react-dom'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy'),
    RegistrationActions = require('../../../actions/registrationActions'),
    RegistrationStore = require('../../../stores/registrationStore');

module.exports = validation(strategy)(React.createClass({
  validatorTypes: {
    email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
    password: Joi.string().min(8).max(127).trim().required().label("Password")
  },

  getValidatorData: function(){
    return {
      email: ReactDom.findDOMNode(this.refs.email).value.trim(),
      password: ReactDom.findDOMNode(this.refs.password).value.trim()
    }
  },

  handleOnSubmit: function(e){
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return
      } else {
        this.createEnrollment();
      }
    };

    this.props.validate(onValidate);
  },

  createEnrollment: function(){
    RegistrationActions.createEnrollmentRequest({
      email: ReactDom.findDOMNode(this.refs.email).value.trim(),
      password: ReactDom.findDOMNode(this.refs.password).value.trim(),
      nextPage: "you"
    });
  },

  renderHelpText: function(message){
    return <label className="text-danger">{message}</label>
  },

  onChange: function(ref){

  },

  render: function(){
    return(
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="body">
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Let's get started</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="text" className="form-control" onChange={this.onChange()} placeholder="Email" ref="email"/>
                    {this.renderHelpText(this.props.getValidationMessages('email'))}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="password" className="form-control" onChange={this.onChange()} placeholder="Password" ref="password"/>
                    {this.renderHelpText(this.props.getValidationMessages('password'))}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <button type="submit" id="signup_continue" className="btn btn-primary">Continue</button>&nbsp;
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }})
);


//propTypes = {
//  errors: PropTypes.object,
//  validate: PropTypes.func,
//  isValid: PropTypes.func,
//  handleValidation: PropTypes.func,
//  getValidationMessages: PropTypes.func,
//  clearValidations: PropTypes.func,
//}
