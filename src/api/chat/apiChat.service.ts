import { ApiInstance } from "../../helpers/httpTransport";
import { CreateChat, UpdateUsers } from "./apiChat.model";

export default class ApiChatService {
  private static __instance: ApiChatService;

  constructor() {
    if (ApiChatService.__instance) {
      return ApiChatService.__instance;
    }

    ApiChatService.__instance = this;
  }

  getChats(): Promise<XMLHttpRequest> {
    return ApiInstance.get("chats");
  }

  getChatUsers(id: number): Promise<XMLHttpRequest> {
    return ApiInstance.get(`chats/${id}/users`);
  }

  chatToken(id: number): Promise<XMLHttpRequest> {
    return ApiInstance.post(`chats/token/${id}`, {
      data: { id },
    });
  }

  createChat(data: CreateChat): Promise<XMLHttpRequest> {
    return ApiInstance.post("chats", {
      data,
    });
  }

  addUsersToChat(data: UpdateUsers): Promise<XMLHttpRequest> {
    return ApiInstance.put("chats/users", {
      data,
    });
  }

  deleteChat(chatId: number): Promise<XMLHttpRequest> {
    return ApiInstance.delete("chats", {
      data: { chatId },
    });
  }

  deleteUsersFromChat(data: UpdateUsers): Promise<XMLHttpRequest> {
    return ApiInstance.delete("chats/users", {
      data,
    });
  }
}
