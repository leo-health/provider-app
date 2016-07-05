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
        <div className="col-lg-12">
          <h4 className="inline-block">Your Information</h4>
          <a className="icon" onClick={this.props.guardianStateToggle}>
            <span className="registration-icon glyphicon glyphicon-pencil pull-right"></span>
          </a>
        </div>
        <div className="col-lg-12">
          <table>
            <tbody>
              <tr>
                <td>Full name</td>
              </tr>
              <tr>
                <td>
                  <p className="lead">{firstName + ' ' + lastName}</p>
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
