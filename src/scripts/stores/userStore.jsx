var Reflux = require('reflux'),
    request = require('superagent'),
    MessageActions = require('../actions/messageActions');

module.exports = Reflux.createStore({
  listenables: [MessageActions],

  onFetchStaffRequest: function(authenticationToken){
    request.get('http://leo-api.elasticbeanstalk.com/api/v1/staff')
           .query({authentication_token: authenticationToken})
           .end(function(err, res){
             if(res.ok){
               MessageActions.fetchStaffRequest.completed(res.body)
             }else{
               MessageActions.fetchStaffRequest.failed(res.body)
             }
        })
  },

  onFetchStaffRequestCompleted: function(response){
    this.trigger({status: response.status,
                  staff: response.data.staff})
  },

  onFetchStaffRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching staff"})
  }
});
