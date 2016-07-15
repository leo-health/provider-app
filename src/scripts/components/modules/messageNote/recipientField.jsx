var React = require('react');
module.exports = React.createClass({

  getInitialState: function () {
    return { shortened: false }
  },

  onClick: function() {
    this.props.onToggleInformation();
  },

  changeRecipientWidth: function() {
    this.setState({
      shortened: !this.state.shortened
    });
  },

  displayUsers: function(users) {
    var userDisplay = users.map(function(user, i){
      if (i + 1 === users.length) {
        return (
          <div key={i} className="to-field--individual medium-font-size">{user.first_name} {user.last_name}</div>
        )
      } else {
        return (
          <div key={i} className="to-field--individual medium-font-size">{user.first_name} {user.last_name},</div>
        )
      }
    });
    return userDisplay;
  },

  render: function() {
    var guardians = this.props.guardians;
    var patients = this.props.patients;
    var guardianDisplay, patientDisplay, userIcon, hyphenIcon, patientIcon;

    if (guardians) {
      userIcon = <span className="glyphicon glyphicon-user"></span>;
      guardianDisplay = this.displayUsers(guardians);
    }

    if (patients) {
      patientDisplay = this.displayUsers(patients);
      hyphenIcon = <div className="to-field--individual orange-font">|</div>;
      patientIcon = <span className="glyphicon glyphicon-ice-lolly to-field--individual orange-font"></span>;
    }

    return (
      <div>
        <span className="pull-left glyphicon glyphicon-chevron-left message-back"
                onClick={this.props.onClickBack}></span>
        <div className="recipient-field-container">
          <div className="pull-left to-field">
            <div className="to-field--list">
              {userIcon}
              {guardianDisplay}
              {hyphenIcon}
              {patientIcon}
              {patientDisplay}
            </div>
            <span className="glyphicon glyphicon-info-sign pull-right toggler"
                  onClick={this.onClick}>
            </span>
          </div>
        </div>
      </div>
    )
  }
});
