import { Block, BlockProps } from '../../modules';

interface ChatMessagesProps extends BlockProps {
  messages: any[];
}

export class ChatMessages extends Block<ChatMessagesProps> {
  static componentName = 'ChatMessages';

  constructor({ ...props }: ChatMessagesProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return `
    <ul class="chat__message-list">
    {{#each messages}}
      <li class="chat__message-list_message-container {{#if my}}chat__message-list_message-container_me{{/if}}">
        <div class="chat__message-list_message-content {{#if my}}chat__message-list_message-content-me{{/if}}">
          <p class="chat__message-list_message-content_text">
            {{content}}
          </p>
          <p class="chat__message-list_message-content_data">
            {{time}}
          </p>
        </div>
      </li>
    {{/each}}
    </ul>
    `;
  }
}
