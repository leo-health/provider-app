var Reflux = require('reflux'),
    request = require('superagent'),
    UserActions = require('../actions/userActions');

module.exports = Reflux.createStore({
  listenables: [UserActions],

  onFetchUsers: function (authenticationToken, query) {
    request.get(leo.API_URL+'/search_user')
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
                  guardians: response.data.guardians,
                  staff: response.data.staff,
                  patients: response.data.patients})
  },

  onFetchUsersFailed: function(response){
    this.trigger({ status: response.status,
                   message: 'error fetching guardians'})
  },

  onSignUpUser: function(authenticationToken){
    request.post(leo.API_URL + "/users")
           .send({ authentication_token: authenticationToken })
           .end(function(err, res){
              UserActions.signUpUser.completed(res.body)
            });
  },

  onSignUpUserCompleted: function (response){
    this.trigger({ status: response.status,
                   sign_up: true })
  },

  onFetchStaffRequest: function(authenticationToken){
    request.get(leo.API_URL+"/staff")
        .query({authentication_token: authenticationToken})
        .end(function(err, res){
          if(res.ok){
            UserActions.fetchStaffRequest.completed(res.body)
          }else{
            UserActions.fetchStaffRequest.failed(res.body)
          }
        })
  },

  onFetchStaffRequestCompleted: function(response){
    var staff = _.filter(response.data.staff, function(staff){ return staff.id !== 1 });
    this.trigger({
      status: response.status,
      staffSelection: staff
    })
  },

  onFetchStaffRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "error fetching staff"
    })
  }
});
