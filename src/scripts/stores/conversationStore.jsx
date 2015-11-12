var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions'),
    MessageActions = require('../actions/messageActions'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationRequest: function(authenticationToken, state, page){
    if( state === "all" ){ state = null };
    request.get(leo.API_URL+"/conversations")
           .query({authentication_token: authenticationToken, state: state, page: page})
           .end(function(err, res){
              if(res.ok){
                ConversationActions.fetchConversationRequest.completed(res.body, state, page)
              }else{
                ConversationActions.fetchConversationRequest.failed(res.body)
              }
            })
  },

  onFetchConversationRequestCompleted: function(response, state, page){
    var conversations = response.data.conversations;
    if( !state ){ state = "all" }
    if (conversations.length > 0){
      var firstConversationId = response.data.conversations[0].id;
      MessageActions.fetchMessagesRequest(localStorage.authenticationToken, firstConversationId);
    }else{
      MessageActions.notifyNoneMessage();
    }

    this.trigger({ status: response.status,
                   conversations: conversations,
                   conversationState: state,
                   maxPage: response.data.max_page,
                   page: page
                  });
  },

  onFetchConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error fetching conversations"})
  },

  onCloseConversationRequest: function(authenticationToken, conversationId, note){
    request.put(leo.API_URL+"/conversations/" + conversationId + "/close")
           .query({ authentication_token: authenticationToken, note: note })
           .end(function(err, res){
             if(res.ok){
               ConversationActions.closeConversationRequest.completed(res.body)
             }else{
               ConversationActions.closeConversationRequest.failed(res.body)
             }
           })
  },

  onCloseConversationRequestCompleted: function(response){
    this.trigger({status: response.status})
  },

  onCloseConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error closing conversation"})
  },

  onEscalateConversationRequest: function(authenticationToken, conversationId, escalatedToId, note, priority){
    escalateParams = { authentication_token: authenticationToken,
                       escalated_to_id: escalatedToId,
                       note: note,
                       priority: priority
                      };
    request.put(leo.API_URL+"/conversations/" + conversationId + "/escalate")
           .query(escalateParams)
           .end(function(err, res){
              if(res.ok){
                ConversationActions.escalateConversationRequest.completed(res.body)
              }else{
                ConversationActions.escalateConversationRequest.failed(res.body)
              }
            })
  },

  onEscalateConversationRequestCompleted: function(response){
    this.trigger({status: response.status})
  },

  onEscalateConversationRequestFailed: function(response){
    this.trigger({status: response.status,
                  message: "error escalating conversation"})
  },

  onFetchConversationByFamily: function (authenticationToken, familyId) {
    request.get('http://localhost:3000/api/v1/families/' + familyId + '/conversation')
           .query({ authentication_token: authenticationToken })
           .end(function(err, res){
             if(res.ok){
               ConversationActions.fetchConversationByFamily.completed(res.body)
             }
           })
  },

  onFetchConversationByFamilyCompleted: function(response){
    this.trigger({ status: response.status,
                   conversations: [response.data.conversation],
                   search: true })
  },

  onFetchStaffConversation: function(authenticationToken, staffId){
    request.get('http://localhost:3000/api/v1/staff/' + staffId + '/conversations')
           .query({ authentication_token: authenticationToken })
           .end(function(err, res){
             if(res.ok){
               ConversationActions.fetchStaffConversation.completed(res.body)
             }
           })
  },

  onFetchStaffConversationCompleted: function(response){
    this.trigger({ status: response.status,
                   selectedConversation: response.data.conversations,
                   search: true })
  }
});
