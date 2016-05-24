var React = require('react'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
  //handleOnClick: function(){
  //  this.createCreditCard(this.refs.paymentForm);
  //},
  //
  //createCreditCard: function(creditCardComponent){
  //  RegistrationActions.createCreditCardRequest({
  //    number: creditCardComponent.refs.cardNumber.value.trim(),
  //    cvc:creditCardComponent.refs.cvc.value.trim(),
  //    exp_month: creditCardComponent.refs.expirationMonth.value.trim(),
  //    exp_year: creditCardComponent.refs.expirationYear.value.trim(),
  //    address_zip: creditCardComponent.refs.zip.value.trim()
  //  }, "review");
  //},

  render: function(){
    return(
      <div>
        <div className="row">
          <div className="col-md-7 col-md-offset-1">
            <h3 className="signup-header">Payment Info</h3>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-8 col-md-offset-1">
            <CreateCreditCard ref="paymentForm"/>
          </div>

          <div className="col-md-2">
            <div className="form-group">
              <button onClick={this.handleOnClick}
                      className="btn btn-primary full-width-button">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
