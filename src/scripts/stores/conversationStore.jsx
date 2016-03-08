var Reflux = require('reflux'),
    request = require('superagent'),
    ConversationActions = require('../actions/conversationActions'),
    MessageActions = require('../actions/messageActions'),
    NoteActions = require('../actions/noteActions');

module.exports = Reflux.createStore({
  listenables: [ConversationActions],

  onFetchConversationsRequest: function(authenticationToken, state, page, offset){
    request.get(leo.API_URL+"/conversations")
           .query({authentication_token: authenticationToken, state: state, page: page})
           .end(function(err, res){
              if(res.ok){
                ConversationActions.fetchConversationsRequest.completed(res.body, state, page)
              }else{
                ConversationActions.fetchConversationsRequest.failed(res.body)
              }
            })
  },

  onFetchConversationsRequestCompleted: function(response, state, page){
    var conversations = response.data.conversations;

    if (page === 1){
      if(conversations.length > 0){
        var firstConversationId = response.data.conversations[0].id;
        MessageActions.fetchMessagesRequest(sessionStorage.authenticationToken, firstConversationId, 1, 0);
      }else{
        MessageActions.emptyMessageList()
      }
    }

    var response = {
      status: response.status,
      conversationState: state,
      maxPage: response.data.max_page,
      page: page
    };

    page === 1 ? response.conversations = conversations : response.newConversations = conversations;

    this.trigger(response);
  },

  onFetchConversationsRequestFailed: function(response){
    this.trigger({
      status: response.status,
      message: "error fetching conversations"
    })
  },

  onFetchConversationByFamily: function (authenticationToken, familyId) {
    request.get(leo.API_URL+'/families/' + familyId + '/conversation')
           .query({ authentication_token: authenticationToken })
           .end(function(err, res){
             if(res.ok){
               ConversationActions.fetchConversationByFamily.completed(res.body, authenticationToken)
             }
           })
  },

  onFetchConversationByFamilyCompleted: function(response, authenticationToken){
    var conversation = response.data.conversation;
    this.trigger({
      status: response.status,
      conversations: [conversation],
      conversationState: Date.now()
    });

    MessageActions.fetchMessagesRequest(authenticationToken, conversation.id, 1, 0)
  },

  onFetchStaffConversation: function(authenticationToken, staffId){
    request.get(leo.API_URL+'/staff/' + staffId + '/conversations')
           .query({ authentication_token: authenticationToken })
           .end(function(err, res){
             if(res.ok) ConversationActions.fetchStaffConversation.completed(res.body, authenticationToken)
           })
  },

  onFetchStaffConversationCompleted: function(response, authenticationToken){
    var conversations = response.data.conversations;

    this.trigger({
      status: response.status,
      conversations: conversations,
      conversationState: Date.now()
    });

    if(conversations.length > 0){
      MessageActions.fetchMessagesRequest(authenticationToken, conversations[0].id, 1, 0)
    }else{
      MessageActions.emptyMessageList()
    }
  },

  onFetchConversationById: function(authenticationToken, conversationId) {
    request.get(leo.API_URL+'/conversations/'+conversationId)
           .query({ authentication_token: authenticationToken })
           .end(function(err, res) {
             if (res.ok) ConversationActions.fetchConversationById.completed(res.body);
           })
  },

  onFetchConversationByIdCompleted: function(response){
    this.trigger({
      newConversation: response.data.conversation
    })
  }
});
