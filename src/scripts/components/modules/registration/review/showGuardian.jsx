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
        <div className="form-group col-md-10 col-md-offset-1">
          <h4>Your Information</h4>
        </div>
        <div className="form-group col-md-1">
          <a className="icon" onClick={this.props.guardianStateToggle}>
            <span className="registration-icon glyphicon glyphicon-pencil pull-right"></span>
          </a>
        </div>
        <div className="form-group col-md-11 col-md-offset-1">
          <table>
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
