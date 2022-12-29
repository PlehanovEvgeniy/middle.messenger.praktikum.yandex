import "../../assets/styles/chat.less";
import { Block } from "../../modules";

export default class Chat extends Block {
  protected render(): string {
    return `
      <div id="chat" class="chat">
        <div class="chat__sidebar">
          {{{ NavLink href='../pages/profile.hbs' class='chat__sidebar_link' text="Профиль" }}}

          <form class="chat__sidebar_search">
            <input class="chat__sidebar_search-input" type="text" placeholder="Поиск" />
            <div class="chat__sidebar_search-icon"></div>
          </form>

          <div class="chat__container">
            <div class="chat__container_left">
              <div class="chat__container_left-avatar"></div>
              <div class="chat__container_left-content">
                <h3 class="chat__container_left-content_title">
                  Андрей
                </h3>
                <p class="chat__container_left-content_message">
                    Друзья, у меня для вас особенный выпуск новостей!...                    
                </p>
              </div>
            </div>
            <div class="chat__container_right">
              <time class="chat__container_right-time">10:49</time>
              <div class="chat__container_right-unread">
                <p class="chat__container_right-unread_message">4</p>
              </div>    
            </div>
          </div>

          <div class="chat__container">
            <div class="chat__container_left">
              <div class="chat__container_left-avatar"></div>
              <div class="chat__container_left-content">
                <h3 class="chat__container_left-content_title">
                  Андрей
                </h3>
                <p class="chat__container_left-content_message">
                  Друзья, у меня для вас особенный выпуск новостей!...                    
                </p>
              </div>
            </div>
            <div class="chat__container_right">
              <time class="chat__container_right-time">10:49</time>
              <div class="chat__container_right-unread">
                <p class="chat__container_right-unread_message">4</p>
              </div>  
            </div>
          </div>
        </div>

        <div class="chat__separator"></div>

        <div class="chat__block">
          <div class="chat__block_empty-space">
            <p class="chat__block_empty-space-text">
              Выберите чат чтобы отправить сообщение
            </p>
          </div>

          <div class="chat__block_header">
            <div class="chat__block_header-info">
              <div class="chat__block_header-info_img"></div>
                <p class="chat__block_header-info_title">
                  Вадим
                </p>
              </div>
  
              <button class="chat__block_header-more">
                <img src="../../assets/images/more.svg" />
              </button>
          </div>

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

          <form class="chat__footer" >
            <button class="chat__footer_button-more">
              <img src="../../assets/images/clip.svg" />
            </button>
            <input class="chat__footer_message-input" name="message" type="text" placeholder="Сообщение">
            <button class="chat__footer_button-enter">
              <img src="../../assets/images/right-arrow.svg" />
            </button>
          </form>
        </div>
      </div>
    `;
  }
}
