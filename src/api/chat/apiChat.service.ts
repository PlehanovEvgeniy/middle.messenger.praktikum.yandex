import { ApiInstance } from '../../helpers/httpTransport';
import { CreateChat, UpdateUsers } from './apiChat.model';

class ApiChatService {
  async getChats(): Promise<XMLHttpRequest> {
    const data = await ApiInstance.get('chats');

    return JSON.parse(data.response);
  }

  getChatUsers(id: number): Promise<XMLHttpRequest> {
    return ApiInstance.get(`chats/${id}/users`);
  }

  async chatToken(id: number): Promise<string> {
    const data = await ApiInstance.post(`chats/token/${id}`, {
      data: { id },
    });

    return JSON.parse(data.response).token;
  }

  createChat(data: CreateChat): Promise<XMLHttpRequest> {
    return ApiInstance.post('chats', {
      data,
    });
  }

  addUsersToChat(data: UpdateUsers): Promise<XMLHttpRequest> {
    return ApiInstance.put('chats/users', {
      data,
    });
  }

  deleteChat(chatId: number): Promise<XMLHttpRequest> {
    return ApiInstance.delete('chats', {
      data: { chatId },
    });
  }

  deleteUsersFromChat(data: UpdateUsers): Promise<XMLHttpRequest> {
    return ApiInstance.delete('chats/users', {
      data,
    });
  }
}

export const apiChat = new ApiChatService();
