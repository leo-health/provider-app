var React = require('react');
var Conversation = require('./conversation');

module.exports = React.createClass({
  render: function () {
    return (
      <div id="content" className="tab-content">
        <div className="tab-pane fade active in" id="all-tab">
          <div className="panel panel-default pre-scrollable-left">
            <Conversation/>
          </div>
        </div>
      </div>  
    )
  }      
});
