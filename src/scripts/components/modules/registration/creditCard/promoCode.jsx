var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return { disabled: false,  promoCode: ""}
  },

  handleOnClick: function(){
    RegistrationActions.applyPromoCodeRequest({
      coupon_id: this.state.promoCode,
      authentication_token: sessionStorage.authenticationToken
    });
    this.setState({disabled: true})
  },

  handlePromoCodeChange: function(e){
    this.setState({promoCode: e.target.value})
  },

  render: function(){
    return(
      <div className="row well">
        <div className="form-group col-md-9">
          <input type="text"
                 value={this.state.promoCode}
                 onChange={this.handlePromoCodeChange}
                 className="form-control"/>
          <label className="text-muted">Promo Code(optional)</label>
        </div>

        <div className="form-group col-md-3">
          <button onClick={this.handleOnClick}
                  disabled = {this.state.disabled}
                  className="btn btn-primary full-width-button">
            Apply
          </button>
        </div>
      </div>
    )
  }
});
