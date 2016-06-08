var React = require('react'),
    NoteActions = require('../../../../actions/noteActions');

module.exports = React.createClass({
  getInitialState: function(){
    return {closureNote: ''}
  },

  handleClosureNoteChange: function(e){
    this.setState({closureNote: e.target.value})
  },

  handleClose: function (e) {
    e.preventDefault();
    NoteActions.createCloseNoteRequest(sessionStorage.authenticationToken, this.props.conversation.id, this.state.closureNote);
    this.props.showMessage();
  },

  render: function(){
    return(
      <div id="close-form" className="alert alert-dismissible alert-default">
        <button type="button" className="close" onClick={this.props.showMessage}>×</button>
        <form className="form alert-form">
          <div className="form-group">
            <label className="control-label">Please enter any relevant notes to explain how the case was resolved.</label>
            <textarea value={this.state.closureNote}
                      onChange={this.handleClosureNoteChange}
                      className="form-control"
                      rows="1"
                      type="text">
            </textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-sm form" onClick={this.handleClose}><span className="glyphicon glyphicon-ok"></span> Close Case</button>
        </form>
      </div>
    )
  }
});
