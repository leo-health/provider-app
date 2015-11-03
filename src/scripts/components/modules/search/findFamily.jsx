var React = require('react');
var Reflux = require('reflux');
var Autosuggest = require('react-autosuggest');
var UserActions = require('../../../actions/userActions');
var UserStore = require('../../../stores/userStore');
const suburbs = ['Cheltenham', 'Mill Park', 'Mordialloc', 'Nunawading'];

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(UserStore, 'onStatusChange')
  ],

  getInitialState: function () {
    return { query: ''}
  },

  onStatusChange: function(results){
    var suggestions = [];
    suggestions.unshift({ sectionName : 'Patients', suggestions : results.patients || [] });
    suggestions.unshift({ sectionName : 'Users', suggestions : results.users || [] });
    this.setState(
      () => {
        this.searchResultsHandler(null, suggestions);
      }
    );
  },

  getSuggestions: function(query, callback){
    if(query.length > 1){
      this.getFamilyNames(query);
      this.searchResultsHandler=callback;
    }
  },

  getFamilyNames: function(query){
    UserActions.fetchUsers(localStorage.authenticationToken, query);
  },

  handleChange: function(e){
    this.setState({ query: e.target.value.trim() })
  },

  getSuggestionValue: function(suggestionObj){
    return suggestionObj.first_name + " " + suggestionObj.last_name
  },

  renderSuggestion: function(suggestion, input){
    suggestion = suggestion.first_name + " " + suggestion.last_name;
    return(<span>{suggestion}</span>)
  },

  handleSearchChange: function (query) {
    this.setState({
      query: query
    })
  },

  handleSelectedSuggest: function(){
    debugger
  },

  render: function () {
    return (
        <div className="panel panel-heading">
          <Autosuggest inputAttributes={{
                         placeholder: 'Find family',
                         onChange: this.handleSearchChange
                       }}
                       suggestions={this.getSuggestions}
                       suggestionValue={this.getSuggestionValue}
                       suggestionRenderer={this.renderSuggestion}
                       onSuggestionSelected={this.handleSelectedSuggest}
                       showWhen={input => input.trim().length >= 2}/>
        </div>
    )
  }
});
