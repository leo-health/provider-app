var React = require('react'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    PromoCode = require('./creditCard/promoCode'),
    ErrorAlert = require('../alert/errorAlert'),
    FAQ = require('./creditCard/paymentFaq'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return { disabled: false }
  },

  componentDidMount: function(){
    if(PRODUCTION) fbq('track', 'AddPaymentInfo');
  },

  handleOnClick: function(){
    this.refs.paymentForm.createCreditCard();
    this.setState({disabled: true})
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.status === "error" && this.state.disabled) this.setState({disabled: false})
  },

  render: function(){
    return(
      <div>
        <br/>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <div className="registration-header mobile-only">REGISTRATION</div>
            <h4 className="signup-header mobile-only">Please enter in your payment information.</h4>
            <h5 className="signup-header mobile-hidden">Please enter in your payment information. You will be charged $20 a month for each child.
            </h5>
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
            <PromoCode/>
          </div>
          <div className="col-md-4 form-group payment-form">
            <button onClick={this.handleOnClick}
                    disabled = {this.state.disabled}
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
