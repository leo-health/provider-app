var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  render: function(){
    return(
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
      </div>
    )
  }
});
