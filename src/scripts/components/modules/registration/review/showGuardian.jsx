var React = require('react');

module.exports =React.createClass({
  render: function(){
    if(this.props.enrollment){
      var email = this.props.enrollment.email;
      var firstName = this.props.enrollment.first_name;
      var lastName = this.props.enrollment.last_name;
      var phone = this.props.formatPhoneNumber(this.props.enrollment.phone);
    }

    return(
      <div className="row">
        <div className="form-group col-md-10 col-md-offset-1">
          <h4>Basic Info</h4>
        </div>
        <div className="form-group col-md-1">
          <a className="icon" onClick={this.props.guardianStateToggle}>
            <span className="registration-icon glyphicon glyphicon-pencil pull-right"></span>
          </a>
        </div>
        <div className="form-group col-md-11 col-md-offset-1">
          <table class="table">
            <tbody>
              <tr>
                <td>Full name</td>
              </tr>
              <tr>
                <td>
                  <p className="lead right-fix">{firstName + ' ' + lastName}</p>
                </td>
              </tr>
              <tr>
                  <td>E-mail address</td>
                  <td>Phone</td>
              </tr>
              <tr>
                <td><p className="lead  right-fix">{email}</p></td>
                <td><p className="lead  right-fix">{phone}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
});
