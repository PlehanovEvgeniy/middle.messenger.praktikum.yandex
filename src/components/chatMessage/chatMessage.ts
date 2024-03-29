import { Chat } from "../../api/chat";
import { Block, BlockProps } from "../../modules";

interface ChatMessageProps extends BlockProps {
  chats: Chat[];
}

export class ChatMessage extends Block<ChatMessageProps> {
  static componentName = "ChatMessage";

  constructor({ ...props }: ChatMessageProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return `
    <ul class="chat__message-list">
      <li class="chat__message-list_message-container">
        <p class="chat__message-list_message-container_text">
          Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.
          Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
          Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
        </p>
        <p class="chat__message-list_message-container_data">
          11:56
        </p>
      </li>
    </ul>
    `;
  }
}
