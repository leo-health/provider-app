var React = require('react'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    ErrorAlert = require('../alert/errorAlert'),
    FAQ = require('./creditCard/paymentFaq'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
  handleOnClick: function(){
    this.refs.paymentForm.createCreditCard();
  },

  componentDidMount: function(){
    if(leo.env === 'production') fbq('track', 'AddPaymentInfo');
  },

  render: function(){
    return(
      <div>
        <br/>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h4 className="signup-header">Please enter in your payment information.</h4>
            <p className="lead">
              At just $20 per month, a Leo membership gives you access to our comprehensive set of features and
              services—beyond what insurance covers—to give your child a superior care experience.
            </p>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-1">
            <CreateCreditCard ref="paymentForm"/>
          </div>
          <div className="col-md-4 form-group">
            <button onClick={this.handleOnClick}
                    className="btn btn-primary full-width-button">
              Continue
            </button>
            <br/><br/>
            <FAQ/>
          </div>
        </div>
      </div>
    )
  }
});
