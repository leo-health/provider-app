var React = require('react'),
    Reflux = require('reflux'),
    RegistrationStore = require('../../../../stores/registrationStore'),
    Helper = require('../../../../utils/registrationHelper'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(RegistrationStore, "onPromoCodeStatusChange")
  ],

  getInitialState: function(){
    return { disabled: false,  promoCode: "", valid: false, errorMessage: [], successMessage: ""}
  },

  onPromoCodeStatusChange: function(status){
    if(!status.coupon) return;
    if(status.coupon.status === 'ok'){
      sessionStorage.coupon = JSON.stringify({id: this.state.promoCode, message: status.coupon.message});
      this.setState({disabled: false, valid: true, errorMessage: [], successMessage: status.coupon.message})
    }else{
      this.setState({disabled: false, valid: false, errorMessage: [status.coupon.message]})
    }
  },

  handleOnClick: function(){
    RegistrationActions.validatePromoCodeRequest({
      coupon_id: this.state.promoCode,
      authentication_token: sessionStorage.authenticationToken
    });

    this.setState({disabled: true})
  },

  handlePromoCodeChange: function(e){
    this.setState({promoCode: e.target.value})
  },

  validateOrSuccessPage: function(){
    if(this.state.valid){
      return <h6>The promo code has been applied. {this.state.successMessage}</h6>
    }else{
      return(
        <div className="row well">
          <div className="form-group col-md-9">
            <input type="text"
                   value={this.state.promoCode}
                   onChange={this.handlePromoCodeChange}
                   className="form-control"/>
            <label>Promo Code (optional)</label>
            {Helper.renderHelpText(this.state.errorMessage)}
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
  },

  render: function(){
    return(
      <div>{this.validateOrSuccessPage()}</div>
    )
  }
});
