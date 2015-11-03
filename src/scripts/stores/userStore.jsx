var Reflux = require('reflux'),
    request = require('superagent'),
    UserActions = require('../actions/userActions');

module.exports = Reflux.createStore({
  listenables: [UserActions],

  onFetchUsers: function (authenticationToken, query) {
    request.get('http://localhost:3000/api/v1/search_user')
           .query({ authentication_token: authenticationToken,
                    query: query})
           .end(function (err, res) {
             if (res.ok) {
               UserActions.fetchUsers.completed(res.body)
             } else {
               UserActions.fetchUsers.failed(res.body)
             }
           })
  },

  onFetchUsersCompleted: function(response){
    this.trigger({status: response.status,
                  users: response.data.users,
                  patients: response.data.patients})
  },

  onFetchUsersFailed: function(response){
    this.trigger({ status: response.status,
                   message: 'error fetching guardians'})
  }
});
