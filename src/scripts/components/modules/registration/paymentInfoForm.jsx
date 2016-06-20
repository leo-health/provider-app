var React = require('react'),
    CreateCreditCard = require('./creditCard/createCreditCard'),
    ErrorAlert = require('../alert/errorAlert'),
    FAQ = require('./creditCard/paymentFaq'),
    RegistrationActions = require('../../../actions/registrationActions');

module.exports = React.createClass({
  getInitialState: function(){
    return { disabled: false }
  },

  handleOnClick: function(){
    this.refs.paymentForm.createCreditCard();
    this.setState({disabled: true})
  },

  componentDidMount: function(){
    if(leo.env === 'production') fbq('track', 'AddPaymentInfo');
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.status === "error" && this.state.disabled) this.setState({disabled: false})
  },

  render: function(){
    return(
      <div>
        <br/>
        <div className="row">
          <div className="col-md-11 col-md-offset-1">
            <h4 className="signup-header">Please enter in your payment information.</h4>
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
          <div className="col-md-6 col-md-offset-1">
            <CreateCreditCard ref="paymentForm"/>
          </div>
          <div className="col-md-4 form-group">
            <button onClick={this.handleOnClick}
                    disabled = {this.state.disabled}
                    className="btn btn-primary full-width-button">
              Continue
            </button>
            <br/><br/>
            <FAQ/>
          </div>
        </div>
      </div>
    )
  }
});
