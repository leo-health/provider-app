var React = require('react');
var Reflux = require('reflux');
var Autosuggest = require('react-autosuggest');
var UserActions = require('../../../actions/userActions');
var UserStore = require('../../../stores/userStore');
var ConversationActions = require('../../../actions/conversationActions');

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
    suggestions.unshift({ sectionName : 'Guardians', suggestions : results.guardians || [] });
    suggestions.unshift({ sectionName : 'Staff', suggestions : results.staff || [] });
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
    this.setState({ query: query })
  },

  handleSelectedSuggest: function(suggestion, event){
    if(suggestion.role.name === 'patient' || suggestion.role.name == 'guardian'){
      ConversationActions.fetchConversationByFamily(localStorage.authenticationToken, suggestion.family_id)
    }else{
      ConversationActions.fetchStaffConversation(localStorage.authenticationToken, suggestion.id)
    }
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
