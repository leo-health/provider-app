var React = require('react');
var Reflux = require('reflux');
var Autosuggest = require('react-autosuggest');
var UserActions = require('../../../actions/userActions');
var UserStore = require('../../../stores/userStore');
var ConversationActions = require('../../../actions/conversationActions');
var leoUtil = require('../../../utils/common').StringUtils;

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
    UserActions.fetchUsers(sessionStorage.authenticationToken, query);
  },

  handleChange: function(e){
    this.setState({ query: e.target.value.trim() })
  },

  getSuggestionValue: function(suggestionObj){
    var displayName = leoUtil.formatName(suggestionObj);
    if(suggestionObj.role === 'patient') displayName = displayName + " " + suggestionObj.birth_date;
    return displayName
  },

  renderSuggestion: function(suggestion, input){
    var displayName = leoUtil.formatName(suggestion);
    if(suggestion.role === 'patient') displayName = displayName + " " + suggestion.birth_date;
    return(<span>{displayName}</span>)
  },

  handleSearchChange: function (query) {
    this.setState({ query: query })
  },

  handleSelectedSuggest: function(suggestion, event){
    if(suggestion.role === 'patient' || suggestion.role === 'guardian'){
      ConversationActions.fetchConversationByFamily(sessionStorage.authenticationToken, suggestion.family_id)
    }else{
      ConversationActions.fetchStaffConversation(sessionStorage.authenticationToken, suggestion.id)
    }
  },

  render: function () {
    return (
      <div className="panel panel-heading">
        <Autosuggest inputAttributes={{
                       placeholder: 'Find conversations by patient or guardian name',
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
