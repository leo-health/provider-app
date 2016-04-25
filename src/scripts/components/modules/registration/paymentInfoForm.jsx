var React = require('react');

module.exports = React.createClass({
  handleOnSubmit: function(e){
    e.preventDefault();
  },

  render: function(){
    return(
      <div>
        <form action="" method="POST">
          <script
              src="https://checkout.stripe.com/checkout.js" className="stripe-button"
              data-key="pk_test_LRYSNRBvOYUG47Sg4QZqtlkB"
              data-amount="999"
              data-name="Demo Site"
              data-description="Widget"
              data-image="/img/documentation/checkout/marketplace.png"
              data-locale="auto">
          </script>
        </form>
      </div>
    )
  }
});
