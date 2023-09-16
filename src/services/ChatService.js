import { BaseService } from "./baseService";

class ChatService extends BaseService {
  getConversation = (limit, page, id, isPartner = 0, isUser = 0) => {
    return this.get(
      `/api/chat/conversation-user?isUser=${isUser}&isPartner=${isPartner}&id=${id}&page=${page}&limit=${limit}`
    );
  };
  createConversation = (PartnerId, UserId) => {
    return this.post(`/api/chat/conversation-user`, {
      PartnerId,
      UserId,
    });
  };
  getAllConversation = (id, partner) => {
    return this.get(
      `/api/chat/conversation-user-all?partner=${partner}&id=${id}`
    );
  };
  getConversationVsAdmin = (userId, partner) => {
    return this.get(
      `/api/chat/conversation-with-admin?id=${userId}&Partner=${partner}`
    );
  };
  getMesVsAdmin = (limit, page, ConversationId) => {
    return this.get(
      `/api/chat/message?page=${page}&limit=${limit}&ConversationId=${ConversationId}`
    );
  };
  getMessByConversationId = (limit, page, conversationId) => {
    return this.get(
      `/api/chat/message-user?page=${page}&limit=${limit}&ConversationId=${conversationId}`
    );
  };
  getConversationById = (conversationId) => {
    return this.get(`/api/chat/conversation-user/${conversationId}`);
  };
  sendMessage = (message) => {
    return this.post(`/api/chat/message-user`, message);
  };
  sendMessageAdmin = (message) => {
    return this.post(`/api/chat/message`, message);
  };
  readMessage = (id) => {
    return this.patch(`/api/chat/message-user`, {
      ConversationId: id,
    });
  };
  readMessageAdmin = (id) => {
    return this.patch(`/api/chat/message`, {
      id,
    });
  };
  getListPartner = () => {
    return this.get(`/api/notification/user?option=0`);
  };

  /**
   * Input: id of UserId || AdminId || PartnerId, role <"User" || "Admin" || "Partner">
   *
   * Output: HTTP request
   */
  getTotalAmountOfConversationHasNewMess = (id, role) =>
    this.get(
      `/api/chat/conversation-user/count-conversation-has-new-mess?id=${id}&role=${role}`
    );

  /**
   * Input: memberId <int>, role <string>: "admin" || "partner" || "user"
   *
   * Output: HTTP request
   */
  getAllConversationId = (memberId, role) =>
    this.get(
      `/api/chat/conversation-user/all-ids?memberId=${memberId}&role=${role}`
    );
}

export const chatService = new ChatService();
