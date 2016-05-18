var React = require('react'),
    ReactDom = require('react-dom'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
 handleOnClick: function(){
   this.props.createCreditCard(this.refs.paymentForm);
 },

  render: function(){
    return(
      <div>
        <div className="row">
          <div className="col-md-7 col-md-offset-1">
            <h3 className="signup-header">Payment Info</h3>
          </div>
        </div>
        <br/>
        <div>
          <span className="payment-errors"></span>
          <div className="col-md-7 col-md-offset-1">
            <CreateCreditCard ref="paymentForm"/>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <button onClick={this.handleOnClick}
                      id="signup_continue"
                      className="btn btn-primary">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
