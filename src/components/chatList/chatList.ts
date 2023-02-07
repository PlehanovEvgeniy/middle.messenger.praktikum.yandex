import { Chat } from "../../api/chat";
import { Block, BlockProps } from "../../modules";

interface ChatListProps extends BlockProps {
  chats: Chat[];
  onSelect: (id: number) => void;
}

export class ChatList extends Block<ChatListProps> {
  static componentName = "ChatList";

  constructor({ ...props }: ChatListProps) {
    super({
      ...props,
      events: {
        click: () => {
          props.onSelect(1);
        },
      },
    });
  }

  protected render(): string {
    return `
    <div>
      {{#each chats}}
        <div class="chat__container" click>
          <div class="chat__container_left">
            <div class="chat__container_left-avatar">
              <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" />
            </div>
            <div class="chat__container_left-content">
            <h3 class="chat__container_left-content_title">
              {{title}}
            </h3>
            <p class="chat__container_left-content_message">
              {{content}}                   
            </p>
          </div>
        </div>
        <div class="chat__container_right">
          <time class="chat__container_right-time">{{time}}</time>
          <div class="chat__container_right-unread">
            <p class="chat__container_right-unread_message">{{unread_count}}</p>
          </div>    
        </div>
        </div>
      {{/each}}
    </div>
    `;
  }
}
