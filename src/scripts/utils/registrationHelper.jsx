var Joi = require('joi'),
    classNames = require('classnames');

var error_strings = {
  any_empty: '{{key}} cannot be empty',
  string_invalid: '{{key}} does not appear to be a valid',
  any_allowOnly: '{{key}} does not match'
};

var RegistrationHelper = {
  formatPhoneNumber: function(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  },

  renderHelpText: function(message){
    var messageClass = classNames({
      "text-danger": message.length > 0,
      "text-muted": message.length === 0
    });

    return <label style={{display: "block"}} className={messageClass}>{message[0]}</label>
  },

  phoneMask: function(e){
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  },

  userValidatorTypes: {
    email: Joi.string().required().regex(/^([+\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, "E-mail address").label("E-mail address").options({
      language: {
        any: {
          empty: error_strings.any_empty
        },
        string: {
          regex: {
            name: error_strings.string_invalid,
          }
        }
      }
    }),
    password: Joi.string().min(8).max(127).trim().required().label("Password").options({
      language: {
        any: {
          empty: error_strings.any_empty
        }
      }
    }),
    firstName: Joi.string().min(2).trim().required().label("First name").options({
      language: {
        any: {
          empty: error_strings.any_empty
        }
      }
    }),
    lastName: Joi.string().min(2).trim().required().label("Last name").options({
      language: {
        any: {
          empty: error_strings.any_empty
        }
      }
    }),
    phone: Joi.string().required().regex(/^\(?[0-9]{3}\)?[\.\ \-]?[0-9]{3}[\.\ \-]?[0-9]{4}$/, "US phone number").label("Phone").options({
      language: {
        any: {
          empty: error_strings.any_empty
        },
        string: {
          regex: {
            name: error_strings.string_invalid
          }
        }
      }
    })
  },

  patientValidatorTypes: {
    firstName: Joi.string().min(2).trim().required().label("First name").options({
      language: {
        any: {
          empty: error_strings.any_empty
        }
      }
    }),
    lastName: Joi.string().min(2).trim().required().label("Last name").options({
      language: {
        any: {
          empty: error_strings.any_empty
        }
      }
    }),
    birthDate: Joi.date().format('MM-DD-YYYY').max(new Date()).required().label("Birth Date")
  },

  passwordConfirmation: {
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().label("Password confirmation").options({
      language: {
        any: {
          empty: error_strings.any_empty,
          allowOnly: error_strings.any_allowOnly
        }
      }
    })
  }
};

module.exports = RegistrationHelper;
