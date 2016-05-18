var React = require('react'),
    ReactDom = require('react-dom'),
    RegistrationActions = require('../../../../actions/registrationActions');

module.exports = React.createClass({
  autoFormAdvance: function(size,currentFormId,nextFormId) {
    if(document.getElementById(currentFormId).value.length===size) {
      document.getElementById(nextFormId).focus();
    }
  },

  render: function(){
    return(
      <div>
        <div className="form-group col-sm-8">
          <input type="text"
                 className="form-control"
                 size="20"
                 placeholder="Card Number"
                 ref="cardNumber"
                 required
                 autoFocus/>
        </div>
        <div className="form-group col-sm-4">
          <input type="text"
                 className="form-control"
                 size="5"
                 placeholder="Zip Code"
                 ref="zip"
                 required/>
        </div>

        <div className="form-group col-sm-4">
          <input type="text"
                 className="form-control"
                 id="expirationMonth"
                 size="2"
                 placeholder="Expiration (MM)"
                 ref="expirationMonth"
                 required
                 onKeyUp={()=>this.autoFormAdvance(2, "expirationMonth", "expirationYear")}/>
        </div>

        <div className="form-group col-sm-4">
          <input type="text"
                 className="form-control"
                 id="expirationYear"
                 size="2"
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
                 placeholder="CVC"
                 required
                 ref="cvc"/>
        </div>
      </div>
    )
  }
});
