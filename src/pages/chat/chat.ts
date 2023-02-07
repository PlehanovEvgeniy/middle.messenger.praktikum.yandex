import "../../assets/styles/chat.less";
import { Block } from "../../modules";
import { getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";
import { apiChat } from "../../api";

import * as clipSvg from "../../assets/images/clip.svg";
import * as rightArrowSvg from "../../assets/images/right-arrow.svg";

export default class Chat extends Block {
  constructor() {
    const { currentUser } = window.store.state;

    const onAddChat = () => {
      this.openChatModal();
    };

    const onSubmit = async (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      const hasError = onSubmitValidation(values, this.children);

      if (hasError) {
        return;
      }
    };

    const onCreateChat = async () => {
      const values = getFormValues();

      await apiChat.createChat({
        title: values.title,
      });

      this.getChats();
      this.closeChatModal();
    };

    const onCloseChatModal = () => {
      this.closeChatModal();
    };

    const onSelectChat = (id: number) => {
      this.setProps({
        ...this.props,
        currentChat: {},
      });
      this.render();
    };

    super({
      ...currentUser,
      addChat: onAddChat,
      createChat: onCreateChat,
      closeChatModal: onCloseChatModal,
      onSelectChat,
      events: {
        submit: onSubmit,
      },
    });
  }

  async getChats() {
    const chats = await apiChat.getChats();
    this.setProps({
      ...this.props,
      chats,
    });
    this.render();
  }

  async componentDidMount() {
    this.getChats();
  }

  openChatModal() {
    const chatModal = document.getElementById("chatModal");
    chatModal?.classList.add("modal-open");
  }

  closeChatModal() {
    const chatModal = document.getElementById("chatModal");
    chatModal?.classList.remove("modal-open");
  }

  protected render(): string {
    return `
      <div id="chat" class="chat">
        <div class="chat__sidebar">
          {{{ Link href='/profile' className='chat__sidebar_link' text="Профиль" }}}

          <form class="chat__sidebar_search">
            {{{ Input className="chat__sidebar_search-input" type="text" placeholder="Поиск" fullWidth="true" }}}
            <div class="chat__sidebar_search-icon"></div>
          </form>
          {{{ Button type="button" onClick=addChat text="Создать чат" className="chat__btn" }}}

          {{{ ChatList chats=chats onSelect=onSelectChat }}}
        </div>

        <div class="chat__separator"></div>

        <div class="chat__block">

          {{#if currentChat}}
            <div class="chat__block_header">
              <div class="chat__block_header-info">
                <div class="chat__block_header-info_img"></div>
                  <p class="chat__block_header-info_title">
                    Вадим
                  </p>
                </div>
            </div>

            {{{ChatMessage chats=chats}}}

            <form class="chat__footer" >
              <button class="chat__footer_button-more">
                <img src=${clipSvg} />
              </button>
              {{{ Input className="chat__footer_message-input" name="message" type="text" placeholder="Сообщение" fullWidth="true" validation="message" }}}
              <button type="submit" class="chat__footer_button-enter">
                <img src=${rightArrowSvg} />
              </button>
            </form>
          {{else}}
            <div class="chat__block_empty-space">
              <p class="chat__block_empty-space-text">
                Выберите чат чтобы отправить сообщение
              </p>
            </div>
          {{/if}} 
          
        </div>

        <div class="modal" id="chatModal">
        <div class="modal__content">
          <p class="h1 modal__title">Добавить новый чат</p>
          <form id="CreateChatForm" class="modal__form">
            {{{Input name="title"}}}
          </form>
            {{{Button text="Создать" onClick=createChat type="button"}}}
            {{{Button text="Закрыть" onClick=closeChatModal type="button"}}}
        </div>
      </div>
      </div>
    `;
  }
}
