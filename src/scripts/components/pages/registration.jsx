var React = require('react');
    ReactDom = require('react-dom'),
    ReactRouter = require('react-router'),
    Reflux = require('reflux'),
    RegistrationActions = require('../../actions/registrationActions'),
    RegistrationStore = require('../../stores/registrationStore'),
    classNames = require('classnames'),
    validation = require('react-validation-mixin'),
    Joi = require('joi'),
    strategy = require('joi-validation-strategy');

var Registration  = React.createClass({
  mixins: [Reflux.listenTo(RegistrationStore, "onStatusChange")],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount: function(){
    RegistrationActions.fetchEnrollmentRequest(this.props.location.query.token);
  },

  validatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name"),
    lastName: Joi.string().min(2).trim().required().label("Last name"),
    email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address"),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone"),
    password: Joi.string().min(8).max(127).trim().required().label("Password"),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().label("Password confirmation").options({
      language: {
        any: {
          allowOnly: "does not match password"
        }
      }
    })
  },

  getInitialState: function() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: ""
    }
  },

  renderMessage: function(messages, labelText, refName){
    var messageClass = classNames({
      "text-danger": messages.length > 0,
      "text-muted": messages.length === 0
    });

    var val = this.state[refName];
    var labelOrValidation = (messages.length === 0 ? labelText : messages[0]);
    // show the label only if there is a message, or the user has replaced the placeholder
    var styles = (val && val.length > 0) || messages.length > 0 ? {} : {visibility: "hidden"};
    return <label style={styles} className={messageClass}>{labelOrValidation}</label>
  },

  onStatusChange: function(response){
    if(response.status != "error"){
      switch(response.action) {
        case "fetch": {
          var user = response.data.user;
          this.setState({
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            email: user.email || ""
          });
          break;
        }
        case "update": {
          this.context.router.push("registration/completed");
          break;
        }
        case "convert": {
          this.context.router.push("registration/completed");
          break;
        }
        default: {
          break;
        }
      }
    }else{
      this.context.router.push("registration/completed");
    }
  },

  getValidatorData: function(){
    return this.state;
  },

  handleOnSubmit: function (e) {
    e.preventDefault();
    const onValidate = (error) => {
      if (error) {
        return;
      } else {
        RegistrationActions.updateEnrollmentRequest({
          authentication_token: this.context.router.getCurrentQuery().token,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password
        })
      }
    };

    this.props.validate(onValidate);
    this.submitHasBeenAttemptedOnce = true;
  },

  onChange: function(ref) {
    return event => {
      if (this.submitHasBeenAttemptedOnce) this.props.handleValidation(ref)();
      var newState = {};
      newState[ref] = event.target.value;
      this.setState(newState);
    }
  },

  render: function(){
    var formData = [
      {
        ftype: "text",
        ref: "firstName",
        placeholder: "First name",
        labelText: "first name"
      },
      {
        ftype: "text",
        ref: "lastName",
        placeholder: "Last name",
        labelText: "last name"
      },
      {
        ftype: "text",
        ref: "email",
        placeholder: "Email",
        labelText: "email"
      },
      {
        ftype: "text",
        ref: "phone",
        placeholder: "Phone",
        labelText: "phone"
      },
      {
        ftype: "password",
        ref: "password",
        placeholder: "Password",
        labelText: "password"
      },
      {
        ftype: "password",
        ref: "passwordConfirmation",
        placeholder: "Password Confirmation",
        labelText: "password confirmation"
      }
    ];

    return(
      <div className="container page-header">
        <div className="row">
          <div className="col-lg-offset-4 col-lg-4 col-lg-offset-4 jumbotron">
            <form className="form-horizontal" onSubmit={this.handleOnSubmit}>
              <div className="text-center">
                <a href="../" className=""><img src="../images/leo.png" alt="..." /></a>
                <h4>You have been invited to join Leo.</h4>
              </div>
              <fieldset>
                <div className="form-group">
                  {formData.map(function(fieldData) {
                  }.bind(this))}
                  return (
                  <div>
                    <input
                        key={fieldData.ref}
                        type={fieldData.ftype}
                        className="form-control"
                        placeholder={fieldData.placeholder}
                        onChange={this.onChange(fieldData.ref)}
                        ref={fieldData.ref}
                        value={this.state[fieldData.ref]}
                        />
                    {this.renderMessage(this.props.getValidationMessages(fieldData.ref), fieldData.labelText, fieldData.ref)}
                  </div>
                  )
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = validation(strategy)(Registration);
