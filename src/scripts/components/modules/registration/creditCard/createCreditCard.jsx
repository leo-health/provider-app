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
          <input type="number"
                 className="form-control"
                 size="20"
                 ref="cardNumber"
                 required
                 autoFocus/>
          <label className="text-muted">Card Number</label>
        </div>
        <div className="form-group col-sm-4">
          <input type="text"
                 className="form-control"
                 size="5"
                 ref="zip"
                 required/>
          <label className="text-muted">Zip Code</label>
        </div>

        <div className="form-group col-sm-4">
          <input type="number"
                 className="form-control"
                 id="expirationMonth"
                 size="2"
                 ref="expirationMonth"
                 required
                 onKeyUp={()=>this.autoFormAdvance(2, "expirationMonth", "expirationYear")}/>
          <label className="text-muted">Expiration (MM)</label>
        </div>

        <div className="form-group col-sm-4">
          <input type="number"
                 className="form-control"
                 id="expirationYear"
                 size="2"
                 ref="expirationYear"
                 required
                 onKeyUp={()=>this.autoFormAdvance(2, "expirationYear", "cvc")}/>
          <label className="text-muted">Expiration (YY)</label>
        </div>

        <div className="form-group col-sm-4">
          <input type="number"
                 className="form-control"
                 id="cvc"
                 size="4"
                 required
                 ref="cvc"/>
          <label className="text-muted">CVC</label>
        </div>
      </div>
    )
  }
});
