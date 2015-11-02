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

  onStatusChange: function(status){
    if(status.guardians){
      this.setState({ guardians: status.guardians })
    }else if(status.patients){
      this.setState({ patients: status.patients })
    }else{
      return
    }
  },

  getSuggestions: function(input, callback){
    if(input.length < 3){ return }
    this.getFamilyNames(input);
    if(this.state.guardians){

    }

    callback(null, suggestions)
  },

  getFamilyNames: function(query){
    UserActions.fetchGuardians(localStorage.authenticationToken, query)
  },

  handleChange: function(e){
    this.setState({ query: e.target.value.trim() })
  },

  render: function () {
    const inputAttributes = {
      placeholder: 'Find family'
    };

    return (
      <div className="panel panel-heading">
        <Autosuggest suggestions={this.getSuggestions}
                     inputAttributes={inputAttributes}/>
      </div>
    )
  }
});

//<form className="form">
//  <input type="text"
//         ref="suggestion"
//         className="form-control"
//         placeholder="Find family"
//         value={this.state.query}
//         onChange={this.handleChange}
//         onBlur={this.hanleChange}/>
//</form>
