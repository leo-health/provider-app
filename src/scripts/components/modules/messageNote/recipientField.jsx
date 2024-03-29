var React = require('react'),
    classNames = require('classnames');

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
    var toggleClass = classNames({
      'glyphicon pull-right toggler cursor': true,
      'glyphicon-info-sign': !this.props.toggled,
      'glyphicon-circle-arrow-right': this.props.toggled
    });

    if (guardians) {
      userIcon = <span><i className="fa fa-user fa-lg"></i></span>;
      guardianDisplay = this.displayUsers(guardians);
    }

    if (patients) {
      patientDisplay = this.displayUsers(patients);
      hyphenIcon = <div className="to-field--individual orange-font">|</div>;
      patientIcon = <span className="to-field--individual orange-font"><i className="fa fa-child fa-lg"></i></span>;
    }

    return (
      <div>
        <span className="pull-left glyphicon glyphicon-menu-left message-back cursor"
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
            <span className={toggleClass}
                  onClick={this.onClick}>
            </span>
          </div>
        </div>
      </div>
    )
  }
});
