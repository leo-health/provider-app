var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');
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
    if(results.guardians && results.staff && results.patients){
      var suggestions = [];
      suggestions.unshift({ sectionName : 'Patients', suggestions : results.patients || [] });
      suggestions.unshift({ sectionName : 'Guardians', suggestions : results.guardians || [] });
      suggestions.unshift({ sectionName : 'Staff', suggestions : results.staff || [] });
      this.setState(
          () => {
            this.searchResultsHandler(null, suggestions);
          }
      );
    }
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
    if(!suggestionObj.role) displayName = this.formatDisplay(displayName, suggestionObj);
    return displayName
  },

  renderSuggestion: function(suggestion, input){
    var displayName = leoUtil.formatName(suggestion);
    if(!suggestion.role) displayName = this.formatDisplay(displayName, suggestion);
    return(<span>{displayName}</span>)
  },

  formatDisplay: function(name, object){
    var birthDate = moment(object.birth_date).subtract(10, 'days').calendar();
    return name + " " + birthDate + " " + object.sex;
  },

  handleSearchChange: function (query) {
    this.setState({ query: query })
  },

  handleSelectedSuggest: function(suggestion, event){
    if(suggestion.family_id){
      ConversationActions.fetchConversationByFamily(sessionStorage.authenticationToken, suggestion.family_id)
    }else{
      ConversationActions.fetchStaffConversation(sessionStorage.authenticationToken, suggestion.id, undefined)
    }
  },

  render: function () {
    return (
      <div className="panel panel-heading find-family-field" data-toggle="tooltip"
                       data-placement="top" title="Find conversation by participant">
        <Autosuggest inputAttributes={{
                       placeholder: "Find conversations by participant",
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
