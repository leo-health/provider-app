var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      cardNumber: "",
      zip: "",
      expirationMonth: "",
      expirationYear: "",
      cvc: ""
    }
  },

  createCreditCard: function(creditCardComponent){
    RegistrationActions.createCreditCardRequest({
      number: this.state.cardNumber,
      cvc:this.state.cvc,
      exp_month: this.state.expirationMonth ,
      exp_year: this.state.expirationYear,
      address_zip: this.state.zip
    }, "review");
  },

  handleCardChange: function(e){
    if(this.isNumber(e.target.value.slice(-1)) || e.target.value === "") this.setState({cardNumber: e.target.value})
  },

  handleZipChange: function(e){
    this.setState({zip: e.target.value})
  },

  handleExpirationMonthChange: function(e){
    if(this.isNumber(e.target.value.slice(-1)) || e.target.value === "") this.setState({expirationMonth: e.target.value})
  },

  handleExpirationYearChange: function(e){
    if(this.isNumber(e.target.value.slice(-1)) || e.target.value === "") this.setState({expirationYear: e.target.value})
  },

  handleCvcChange: function(e){
    if(this.isNumber(e.target.value.slice(-1)) || e.target.value === "") this.setState({cvc: e.target.value})
  },

  isNumber: function(num){
    return num.charCodeAt() >= 48 && num.charCodeAt() <= 57
  },

  render: function(){
    return(
      <div className="row">
        <div className="form-group col-md-8">
          <input type="text"
                 className="form-control"
                 value={this.state.cardNumber}
                 onChange={this.handleCardChange}
                 maxLength="16"
                 required
                 autoFocus/>
          <label className="text-muted">Card Number</label>
        </div>
        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.zip}
                 onChange={this.handleZipChange}
                 required/>
          <label className="text-muted">Zip Code</label>
        </div>

        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.expirationMonth}
                 onChange={this.handleExpirationMonthChange}
                 maxLength="2"
                 required/>
          <label className="text-muted">Expiration (MM)</label>
        </div>

        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.expirationYear}
                 onChange={this.handleExpirationYearChange}
                 maxLength="2"
                 required/>
          <label className="text-muted">Expiration (YY)</label>
        </div>

        <div className="form-group col-md-4">
          <input type="text"
                 className="form-control"
                 value={this.state.cvc}
                 onChange={this.handleCvcChange}
                 maxLength="4"
                 required/>
          <label className="text-muted">CVC</label>
        </div>
      </div>
    )
  }
});
