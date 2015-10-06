var React = require('react');
var Reflux = require('reflux');
var NoteActions = require('../../../actions/noteActions');

module.exports = React.createClass({
  getInitialState: function(){

  },

  componentDidMount: function(){
    NoteActions.fetchNoteRequest(localStorage.authentication_token);
  },

  render: function () {
    var notes = this.state.notes;
    return (
      <div id="notes-container" className="pre-scrollable panel panel-body">
        <h4>Notes</h4>
        <blockquote>
          <div><small> 12:00 PM </small><strong>Dr. Victoria Riese</strong>   Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.Cras sit amet nibh libero, in gravida nulla.
          </div>
        </blockquote>
      </div>
    )
  }
});
