var Reflux = require('reflux'),
    request = require('superagent'),
    UserActions = require('../actions/userActions');

module.exports = Reflux.createStore({
  listenables: [UserActions],

  onFetchGuardians: function (authenticationToken, query) {
    request.get('http://localhost:3000/api/v1/search_guardian')
           .query({ authentication_token: authenticationToken,
                    first_name: query})
           .end(function (err, res) {
             if (res.ok) {
               UserActions.fetchGuardians.completed(res.body)
             } else {
               UserActions.fetchGuardians.failed(res.body)
             }
           })
  },

  onFetchGuardiansCompleted: function(response){
    this.trigger({status: response.status,
                  guardians: response.data.guardians})
  },

  onFetchGuardiansFailed: function(response){
    this.trigger({ status: response.status,
                   message: 'error fetching guardians'})
  },

  onFetchPatients: function(name){

  },

  onFetchPatientsCompleted: function(response){

  },

  onFetchPatientsFailed: function(response){

  }
});
