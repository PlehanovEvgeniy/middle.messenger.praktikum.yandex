import WSTransport, { WSTransportEvents } from './wsTransport';
import { apiChat } from '../api';
import { dateFormatting } from './index';

class Messages {
  private socket!: WSTransport;

  private sockets: { [id: string]: WSTransport } = {};

  async connect(chatId: number) {
    this.disconnect();

    const userId = window.store.state.currentUser!.id;
    const token = await apiChat.chatToken(chatId);

    this.socket = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    );

    await this.socket.connect();

    this.sockets[chatId] = this.socket;
    this.socket.on(WSTransportEvents.Message, (message) => this.storeMessages(message));
    this.socket.on(WSTransportEvents.Close, () => this.disconnect());

    this.socket.send({ type: 'get old', content: 0 });
  }

  disconnect() {
    const sockets = Object.keys(this.sockets);
    if (sockets.length) {
      sockets.forEach((id: string) => {
        this.sockets[id].close();
        delete this.sockets[id];
      });

      window.store.dispatch({ messages: [] });
    }
  }

  public sendMessage(content: string): void {
    this.socket.send({
      content,
      type: 'message',
    });
  }

  private async storeMessages(messages: any | Array<any>): Promise<void> {
    let newMessages: Array<any> = [];

    if (Array.isArray(messages)) {
      newMessages = messages
        .filter((message) => message.type === 'message')
        .map((message) => ({
          ...message,
          my: window.store.state.currentUser!.id === message.user_id,
          time: dateFormatting(message.time),
        }))
        .reverse();
    } else {
      newMessages.push({
        ...messages,
        my: window.store.state.currentUser!.id === messages.user_id,
        time: dateFormatting(messages.time),
      });
    }

    const currentMessages = window.store.state.messages;
    currentMessages.push(newMessages);

    window.store.dispatch({ messages: currentMessages.flat() });
  }
}

export const messages = new Messages();
