var React = require('react'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    ErrorAlert = require('../alert/errorAlert'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
  handleOnClick: function(){
    this.refs.paymentForm.createCreditCard();
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
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <ErrorAlert message={this.props.message}
                        status={this.props.status}/>
          </div>
        </div>
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
