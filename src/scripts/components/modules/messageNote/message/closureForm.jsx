var React = require('react'),
    NoteActions = require('../../../../actions/noteActions'),
    classNames = require('classnames');

module.exports = React.createClass({
  getInitialState: function(){
    return {closureOption: '', closureNote: ''}
  },

  handleClosureNoteChange: function(e){
    this.setState({closureNote: e.target.value})
  },

  handleClose: function (e) {
    e.preventDefault();
    NoteActions.createCloseNoteRequest(sessionStorage.authenticationToken, this.props.conversation.id, this.state.closureNote);
    this.props.showMessage();
  },

  handleClosureToChange: function(e){
    console.log(e.target)
    this.setState({ closureOption: e.target.value })
  },

  render: function(){
    var closureClass = classNames({
      'form-control medium-font-size closure-text': true,
      'show-text-field': this.state.closureOption == "07"
    });

    return(
      <div id="close-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" onClick={this.props.showMessage}>×</button>
        <form className="form alert-form">
          <div className="form-group">
            <label className="control-label medium-font-size">Please enter any relevant notes to explain how the case was resolved.</label>
            <select className="form-control drop-down" onChange={this.handleClosureToChange}>
              <option value="">Select a reason</option>
              <option value="01">1 - scheduled appointment</option>
              <option value="02">2 - resolved over the phone</option>
              <option value="03">3 - addressed on messaging (clinical)</option>
              <option value="04">4- addressed on messaging (administrative)</option>
              <option value="05">5 - addressed on messaging (billing)</option>
              <option value="06">6 - related to previous</option>
              <option value="07">7 - other (explain below)</option>
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
