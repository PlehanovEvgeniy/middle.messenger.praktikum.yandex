import "../../assets/styles/profile.less";
import { Block } from "../../modules";

export default class ChangeData extends Block {
  protected render(): string {
    return `
      <div class="profile">
        <div class="profile__back">
          <div class="profile__back_icon">
            <a href="./chat.hbs">
              <img src="../../assets/images/back-arrow.svg" alt="Назад">
            </a>
          </div>
        </div>
        <div class="profile__container">
          <div class="profile__container_avatar">
            <img src="/assets/images/profile.png" alt="Профиль">
          </div>
  
          <form class="profile__container_info">
            {{{ ProfileInput type='email' name='email' label='Почта' placeholder='pochta@yandex.ru' }}}
            {{{ ProfileInput type='text' name='login' label='Логин' placeholder='ivanivanov' }}}
            {{{ ProfileInput type='text' name='name' label='Имя' placeholder='Иван' }}}
            {{{ ProfileInput type='text' name='surname' label='Фамилия' placeholder='Иванов' }}}
            {{{ ProfileInput type='text' name='chatName' label='Имя в чате' placeholder='Иван' }}}
            {{{ ProfileInput type='tel' name='tel' label='Телефон' placeholder='+7-909-967-30-30' }}}
          </form>
  
          {{{ Button text="Сохранить" }}}
        </div
       </div>
      `;
  }
}
