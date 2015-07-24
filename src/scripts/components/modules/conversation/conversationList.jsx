var React = require('react');
var Conversation = require('./conversation');
var ConversationHeader = require('./conversationHeader');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <ConversationHeader/>
        <div id="content" className="tab-content">
          <div className="tab-pane fade active in" id="all-tab">
            <div className="panel panel-default pre-scrollable-left">
              <Conversation/>
            </div>
          </div>
        </div>
      </div>
    )
  }      
});
