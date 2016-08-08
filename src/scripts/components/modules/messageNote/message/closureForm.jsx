var React = require('react'),
    NoteActions = require('../../../../actions/noteActions'),
    NoteStore = require('../../../../stores/noteStore'),
    Reflux = require('reflux'),
    classNames = require('classnames');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(NoteStore, "onClosureReasonChange"),
  ],

  getInitialState: function(){
    return {closureOption: '', closureNote: '', reasons: []}
  },

  componentWillMount: function () {
    noteActions.fetchReasonRequest(sessionStorage.authenticationToken);
  },

  onClosureReasonChange: function(){
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
    NoteActions.createCloseNoteRequest(sessionStorage.authenticationToken, this.props.conversation.id, this.state.closureNote);
    this.props.showMessage();
  },

  handleClosureToChange: function(e){
    console.log(e.target)
    this.setState({ closureOption: e.target.value })
  },

  parseReasons: function(){
    if(this.state.reasons.length > 0){
      return this.state.reasons.map(function(reason, i){
        return <option className="dark-gray-font" key={i} value={reason.id}>{leoUtil.formatName(reason.long_description)}</option>
      })
    }
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
              <option value="appointment">1 - scheduled appointment</option>
              <option value="phone">2 - resolved over the phone</option>
              <option value="clinical">3 - clinical issue</option>
              <option value="administrative">4 - administrative</option>
              <option value="billing">5 - billing</option>
              <option value="previous">6 - related to previous</option>
              <option value="other - ">7 - other (explain below)</option>
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
