var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {query: ''}
  },

  componentDidMount: function(){
    var suggests = new Bloodhound({
      initialize: false,
      local: ['dog', 'pig', 'moose'],
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: Bloodhound.tokenizers.whitespace
    });

    var promise = suggests.initialize();

    promise
    .done(function() { console.log('ready to go!'); })
    .fail(function() { console.log('err, something went wrong :('); });
  },

  render: function () {
    return (
      <div className="panel panel-heading">
        <form className="form">
          <input type="text"
                 className="form-control"
                 placeholder="Find family"/>
        </form>
      </div>
    )
  }
});
