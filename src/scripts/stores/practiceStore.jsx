var Reflux = require('reflux'),
    request = require('superagent'),
    PracticeActions = require('../actions/practiceActions');

module.exports = Reflux.createStore({
  listenables: [PracticeActions],

  onFetchPracticeRequest: function(param){
    request.get(leo.API_URL+"/practices/current")
           .query(param)
           .end(function(err,res){
           if(res.ok) {
             PracticeActions.fetchPracticeRequest.completed(res.body)
           }else{
             PracticeActions.fetchPracticeRequest.failed(res.body)
           }
         })
  },

  onFetchPracticeRequestCompleted: function(response){
    this.trigger({
      status: 'ok',
      practice: response.data.practice
    })
  },

  onFetchPracticeRequestFailed: function(response){
    this.trigger({
      status: 'error',
      message: response.message.user_message
    })
  }
});
