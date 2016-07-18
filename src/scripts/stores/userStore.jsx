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

  onConfirmInvitedGuardian: function(authenticationToken){
    request.put(leo.API_URL + "/confirm_secondary_guardian")
           .send({ authentication_token: authenticationToken })
           .end(function(err, res){
              UserActions.confirmInvitedGuardian.completed(res.body)
            });
  },

  onConfirmInvitedGuardianCompleted: function (response){
    this.trigger({ status: response.status })
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
    var staff = response.data.staff;
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
