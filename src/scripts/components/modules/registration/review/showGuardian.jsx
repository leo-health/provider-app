var React = require('react');

module.exports =React.createClass({
  render: function(){
    if(this.props.user){
      var email = this.props.user.email;
      var firstName = this.props.user.first_name;
      var lastName = this.props.user.last_name;
      var phone = this.props.formatPhoneNumber(this.props.user.phone);
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
