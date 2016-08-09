var React = require('react'),
    NoteActions = require('../../../../actions/noteActions'),
    NoteStore = require('../../../../stores/noteStore'),
    Reflux = require('reflux'),
    classNames = require('classnames'),
    ErrorAlert = require('../../alert/errorAlert');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(NoteStore, "onClosureReasonChange"),
  ],

  getInitialState: function(){
    return {reasonId: '', closureNote: '', reasons: [], hasNote: false, status: '', errorMessage: ''}
  },

  componentWillMount: function () {
    NoteActions.fetchReasonRequest(sessionStorage.authenticationToken);
  },

  onClosureReasonChange: function(status){
    if(status.reasonSelection){
      this.setState({
        reasons: status.reasonSelection
      })
    }
  },

  handleClosureNoteChange: function(e){
    this.setState({closureNote: e.target.value})
  },

  handleClose: function (e) {
    e.preventDefault();
    if (this.state.hasNote && this.state.closureNote === "") {
      this.setState({
        status: 'error',
        errorMessage: 'Please include an explanation'
      })
    } else if (this.state.reasonId === "" || !this.state.reasonId) {
      this.setState({
        status: 'error',
        errorMessage: 'Please select a closure reason'
      })
    } else {
      NoteActions.createCloseNoteRequest(sessionStorage.authenticationToken, this.props.conversation.id, this.state.hasNote, this.state.closureNote, this.state.reasonId);
      this.props.showMessage();
    }
  },

  handleClosureToChange: function(e){
    targetArray = JSON.parse("[" + e.target.value + "]");
    this.setState({
      reasonId: targetArray[0],
      hasNote: targetArray[1]
    })
  },

  parseReasons: function(){
    if(this.state.reasons.length > 0){
      return this.state.reasons.map(function(reason, i){
        return <option className="dark-gray-font" key={reason.order} value={[reason.id, reason.has_note]}>{i} - {reason.long_description}</option>
      })
    }
  },

  render: function(){
    var closureClass = classNames({
      'form-control medium-font-size closure-text': true,
      'show-text-field': this.state.hasNote
    })

    return(
      <div id="close-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" onClick={this.props.showMessage}>×</button>
        <form className="form alert-form">
          <ErrorAlert message={this.state.errorMessage} status={this.state.status}/>
          <div className="form-group">
            <label className="control-label medium-font-size">Please enter any relevant notes to explain how the case was resolved.</label>
            <select className="form-control drop-down" onChange={this.handleClosureToChange}>
              <option value="">Select a reason</option>
              {this.parseReasons()}
            </select>
            <textarea value={this.state.closureNote}
                      onChange={this.handleClosureNoteChange}
                      className={closureClass}
                      rows="1"
                      type="text">
            </textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-sm form message-button" onClick={this.handleClose}><span className="glyphicon glyphicon-ok"></span> Close Case</button>
        </form>
      </div>
    )
  }
});
