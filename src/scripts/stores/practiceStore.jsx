var Reflux = require('reflux'),
    request = require('superagent'),
    PracticeActions = require('../actions/practiceActions');

module.exports = Reflux.createStore({
  listenables: [PracticeActions],

  onFetchPracticeRequest: function(params){
    request.get(leo.API_URL+"/practices/" + params.id)
           .query(params)
           .end(function(err,res){
             if(res.ok) PracticeActions.fetchPracticeRequest.completed(res.body)
           })
  },

  onFetchPracticeRequestCompleted: function(response){
    this.trigger(response)
  }
});
