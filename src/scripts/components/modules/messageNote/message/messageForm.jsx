var React = require('react'),
    SendMessageForm = require('./sendMessageForm'),
    ClosureForm = require('./closureForm'),
    EscalationForm = require('./escalationForm');

module.exports = React.createClass({
  getInitialState: function () {
    return {action: "message"}
  },

  showClose: function() {
    this.setState({ action: "close" })
  },

  showEscalation: function() {
    this.setState({ action: "escalate" })
  },

  showMessage: function() {
    this.setState({ action: "message" })
  },

  formSelection: function(){
    var page;
    switch(this.state.action){
      case 'escalate':
        page = <EscalationForm conversation={this.props.conversation}
                               staff={this.props.staff}
                               showMessage={this.showMessage}/>;
        break;
      case 'close':
        page = <ClosureForm conversation={this.props.conversation}
                            showMessage={this.showMessage}/>;
        break;
      default:
        page = <SendMessageForm conversation={this.props.conversation}
                                showClose={this.showClose}
                                showEscalation={this.showEscalation}
                                />;
        break;
    }
    return page;
  },

  render: function () {
    return (
      <div>
        {this.formSelection()}
      </div>
    )
  }
});
