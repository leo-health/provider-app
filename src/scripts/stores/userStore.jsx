var Reflux = require('reflux'),
    request = require('superagent'),
    UserActions = require('../actions/userActions');

module.exports = Reflux.createStore({
  listenables: [UserActions],

  onFetchGuardians: function (authenticationToken, query) {
    request.get('http://localhost:3000/api/v1/search_guardian')
           .query({ authentication_token: authenticationToken,
                    query: query})
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
                  guardians: response.data})
  },

  onFetchGuardiansFailed: function(response){
    this.trigger({ status: response.status,
                   message: 'error fetching guardians'})
  },

  onFetchPatients: function(authenticationToken, query){
    request.get('http://localhost:3000/api/v1/search_patient')
        .query({ authentication_token: authenticationToken,
                 query: query})
        .end(function (err, res) {
          if (res.ok) {
            UserActions.fetchPatients.completed(res.body)
          } else {
            UserActions.fetchPatients.failed(res.body)
          }
        })
  },

  onFetchPatientsCompleted: function(response){
    this.trigger({status: response.status,
                  patients: response.data})
  },

  onFetchPatientsFailed: function(response){
    this.trigger({ status: response.status,
                   message: 'error fetching patients'})
  }
});
