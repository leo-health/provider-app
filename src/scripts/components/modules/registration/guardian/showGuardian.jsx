var React = require('react');

module.exports =React.createClass({
  render: function(){
    if(this.props.enrollment){
      var firstName = this.props.enrollment.first_name;
      var lastName = this.props.enrollment.last_name;
      var phone = this.props.formatPhoneNumber(this.props.enrollment.phone);
      var insurance=this.props.enrollment.insurance_plan.plan_name;
    }

    return(
      <div className="row">
        <div className="form-group col-md-3">
          {insurance}
        </div>
        <div className="form-group col-md-3">
          {firstName}
        </div>
        <div className="form-group col-md-3">
          {lastName}
        </div>
        <div className="form-group col-md-3">
          {phone}
        </div>
      </div>
    )
  }
});
