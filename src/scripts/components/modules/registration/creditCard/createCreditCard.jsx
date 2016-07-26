var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return { cardNumber: "", zip: "", expirationDate: "", cvc: "" }
  },

  createCreditCard: function(creditCardComponent){
    RegistrationActions.createCreditCardRequest({
      number: this.state.cardNumber,
      cvc:this.state.cvc,
      exp_month: this.state.expirationDate.substring(0,2) ,
      exp_year: this.state.expirationDate.substring(3,5),
      address_zip: this.state.zip
    }, "review");
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.status === "error" && this.state.disabled) this.setState({disabled: fals})
  },

  handleCardChange: function(e){
    if(this.isNumber(e.target.value.slice(-1)) || e.target.value === "") this.setState({cardNumber: e.target.value})
  },

  handleZipChange: function(e){
    this.setState({zip: e.target.value})
  },

  handleExpirationDateChange: function(e){
    this.setState({ expirationDate: e.target.value })
  },

  handleCvcChange: function(e){
    if(this.isNumber(e.target.value.slice(-1)) || e.target.value === "") this.setState({cvc: e.target.value})
  },

  isNumber: function(num){
    return num.charCodeAt() >= 48 && num.charCodeAt() <= 57
  },

  expirationDateMask: function(e){
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '/' + x[2]
  },

  render: function(){
    return(
      <div className="row well">
        <div className="form-group col-md-8">
          <input type="text"
                 className="form-control"
                 value={this.state.cardNumber}
                 onChange={this.handleCardChange}
                 maxLength="16"
                 required
                 pattern="[0-9]*"
                 autoFocus/>
          <label>Card Number</label>
        </div>
        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.cvc}
                 onChange={this.handleCvcChange}
                 maxLength="4"
                 pattern="[0-9]*"
                 required/>
          <label>CVC</label>
        </div>

        <div className="form-group col-md-6">
          <input type="text"
                 className="form-control"
                 value={this.state.expirationMonth}
                 onChange={this.handleExpirationDateChange}
                 maxLength="5"
                 onInput={this.expirationDateMask}
                 pattern="[0-9]*"
                 required/>
          <label>Expiration (MM/YY)</label>
        </div>

        <div className="form-group col-md-6">
          <input type="text"
                 className="form-control"
                 value={this.state.zip}
                 onChange={this.handleZipChange}
                 pattern="[0-9]*"
                 required/>
          <label>Zip Code</label>
        </div>
      </div>
    )
  }
});
