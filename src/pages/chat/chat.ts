import "../../assets/styles/chat.less";
import { Block } from "../../modules";
import { getFormValues, messages } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";
import { apiChat } from "../../api";

import * as moreSvg from "../../assets/images/more.svg";
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

      messages.sendMessage(values.message);
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

    const onSelectChat = async (id: number) => {
      const chat = window.store.state.chats.find((chat: any) => chat.id === id);

      this.setProps({
        ...this.props,
        messages: [],
        currentChat: chat,
      });

      window.store.dispatch({ currentChat: chat });

      await messages.connect(id);
      window.store.on("changed", (prevState: any, newState: any) => {
        if (newState.messages && newState.messages.length) {
          this.setProps({
            ...this.props,
            messages: newState.messages,
          });
        }
      });

      this.render();
    };

    super({
      ...currentUser,
      addChat: onAddChat,
      createChat: onCreateChat,
      closeChatModal: onCloseChatModal,
      moreIcon: `<img src=${moreSvg} />`,
      onSelectChat,
      showMoreMenu: () => this.showMoreMenu(),
      onDeleteChat: () => this.onDeleteChat(),
      onAddUserModal: () => this.openAddUserModal(),
      onDeleteUserModal: () => this.openDeleteUserModal(),
      onAddUser: () => this.onAddUser(),
      onDeleteUser: () => this.onDeleteUser(),
      closeAddUserModal: () => this.closeAddUserModal(),
      closeDeleteUserModal: () => this.closeDeleteUserModal(),
      events: {
        submit: onSubmit,
      },
    });

    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  async getChats() {
    const chats = await apiChat.getChats();
    this.setProps({
      ...this.props,
      chats,
    });

    window.store.dispatch({ chats });
    this.render();
  }

  showMoreMenu() {
    const menu = document.getElementById("chatDropdown");
    menu?.classList.toggle("chat__block_header__links--active");
  }

  async onAddUser() {
    const values = getFormValues();
    const chatId = window.store.state.currentChat.id;

    await apiChat.addUsersToChat({
      chatId: chatId,
      users: [Number(values.addUser)],
    });

    this.closeAddUserModal();
  }

  async onDeleteUser() {
    const values = getFormValues();
    const chatId = window.store.state.currentChat.id;

    await apiChat.deleteUsersFromChat({
      chatId: chatId,
      users: [Number(values.addUser)],
    });

    this.closeDeleteUserModal();
  }

  async onDeleteChat() {
    const chatId = window.store.state.currentChat.id;
    messages.disconnect();

    await apiChat.deleteChat(chatId);

    this.setProps({
      ...this.props,
      currentChat: null,
    });
    await this.getChats();
  }

  onKeyDown(event: any) {
    if (event.code === "Escape") {
      this.setProps({
        ...this.props,
        currentChat: null,
      });

      messages.disconnect();
      this.render();
    }
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

  openAddUserModal() {
    const chatModal = document.getElementById("addUserChatModal");
    chatModal?.classList.add("modal-open");
  }

  closeAddUserModal() {
    const chatModal = document.getElementById("addUserChatModal");
    chatModal?.classList.remove("modal-open");
  }

  openDeleteUserModal() {
    const chatModal = document.getElementById("deleteUserChatModal");
    chatModal?.classList.add("modal-open");
  }

  closeDeleteUserModal() {
    const chatModal = document.getElementById("deleteUserChatModal");
    chatModal?.classList.remove("modal-open");
  }

  protected render(): string {
    return `
      <div id="chat" class="chat">
        <div class="chat__sidebar">
          {{{ Link href='/settings' className='chat__sidebar_link' text="Профиль" }}}

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
                    {{currentChat.title}}
                  </p>
                </div>
                
                {{{ Button type="button" className="chat__block_header-more" onClick=showMoreMenu node=moreIcon}}}
                
                <div id="chatDropdown" class="chat__block_header__links">
                  <ul class="chat__block_header__links-list">
                    <li class="chat__block_header__links-item">
                      {{{ Button
                        text="Добавить пользователя"
                        className="chat__block_header__link"
                        onClick=onAddUserModal
                      }}}
                    </li>
                    <li class="chat__block_header__links-item">
                      {{{ Button
                        text="Удалить пользователя"
                        className="chat__block_header__link"
                        onClick=onDeleteUserModal
                      }}}
                    </li>
                    <li class="chat__block_header__links-item">
                      {{{ Button
                        text="Удалить чат"
                        className="chat__block_header__link"
                        onClick=onDeleteChat
                      }}}
                    </li>
                  </ul>
                </div>
            </div>

            {{{ChatMessages messages=messages}}}

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

        <div class="modal" id="addUserChatModal">
          <div class="modal__content">
            <p class="h1 modal__title">Добавить нового пользователя</p>
            <form id="CreateChatForm" class="modal__form">
              {{{Input name="addUser"}}}
            </form>
            {{{Button text="Добавить" onClick=onAddUser type="button"}}}
            {{{Button text="Закрыть" onClick=closeAddUserModal type="button"}}}
          </div>
        </div>

        <div class="modal" id="deleteUserChatModal">
          <div class="modal__content">
            <p class="h1 modal__title">Удалить пользователя</p>
            <form id="CreateChatForm" class="modal__form">
              {{{Input name="deleteUser"}}}
            </form>
            {{{Button text="Удалить" onClick=onDeleteUser type="button"}}}
            {{{Button text="Закрыть" onClick=closeDeleteUserModal type="button"}}}
          </div>
        </div>
      </div>
    `;
  }
}
