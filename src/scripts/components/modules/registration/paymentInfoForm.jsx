var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
  handleOnSubmit: function(e){
    e.preventDefault();
    RegistrationActions.createCreditCardRequest(e.currentTarget, "review");
  },

  componentDidMount: function(){
    Stripe.setPublishableKey('pk_test_LRYSNRBvOYUG47Sg4QZqtlkB');
  },

  autoFormAdvance: function(size,currentFormId,nextFormId) {
    if(document.getElementById(currentFormId).value.length===size) {
      document.getElementById(nextFormId).focus();
    }
  },

  render: function(){
    return(
      <div>
        <form action="" method="POST" id="payment-form" onSubmit={this.handleOnSubmit}>
          <div className="body">
            <span className="payment-errors"></span>

            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Payment Info</h3>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="form-group col-sm-8">
                    <input type="text"
                           className="form-control"
                           size="20" data-stripe="number"
                           placeholder="Card Number"
                           ref="cardNumber"
                           required
                           autoFocus/>
                  </div>
                  <div className="form-group col-sm-4">
                    <input type="text"
                           className="form-control"
                           size="5"
                           data-stripe="address_zip"
                           placeholder="Zip Code"
                           ref="zip"
                           required/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-4">
                    <input type="text"
                           className="form-control"
                           id="expirationMonth"
                           size="2"
                           data-stripe="exp_month"
                           placeholder="Expiration (MM)"
                           ref="expirationMonth"
                           required
                           onKeyUp={()=>this.autoFormAdvance(2, "expirationMonth", "expirationYear")} />
                  </div>

                  <div className="form-group col-sm-4">
                    <input type="text"
                           className="form-control"
                           id="expirationYear"
                           size="2"
                           data-stripe="exp_year"
                           placeholder="Expiration (YY)"
                           ref="expirationYear"
                           required
                           onKeyUp={()=>this.autoFormAdvance(2, "expirationYear", "cvc")}/>
                  </div>

                  <div className="form-group col-sm-4">
                    <input type="text"
                           className="form-control"
                           id="cvc"
                           size="4"
                           data-stripe="cvc"
                           placeholder="CVC"
                           required
                           ref="cvc"/>
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
  }
});
