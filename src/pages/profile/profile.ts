import "../../assets/styles/profile.less";
import { Block } from "../../modules";
import * as backArrowSvg from "../../assets/images/back-arrow.svg";
import * as profilePng from "../../assets/images/profile.png";

export default class Profile extends Block {
  protected render(): string {
    return `
      <div class="profile">
        <div class="profile__back">
          <div class="profile__back_icon">
            <a href="./chat.hbs">
              <img src=${backArrowSvg} alt="Назад">
            </a>
          </div>
        </div>

        <div class="profile__container">
          <div class="profile__container_avatar">
            <img src=${profilePng} alt="Профиль">
          </div>

          <h2 class="profile__container_title">Иван</h2>
          <form class="profile__container_info">
            {{{ ProfileInput type='email' name='email' label='Почта' placeholder='pochta@yandex.ru' }}}
            {{{ ProfileInput type='text' name='login' label='Логин' placeholder='ivanivanov' }}}
            {{{ ProfileInput type='text' name='first_name' label='Имя' placeholder='Иван' }}}
            {{{ ProfileInput type='text' name='second_name' label='Фамилия' placeholder='Иванов' }}}
            {{{ ProfileInput type='text' name='display_name' label='Имя в чате' placeholder='Иван' }}}
            {{{ ProfileInput type='tel' name='phone' label='Телефон' placeholder='+7-909-967-30-30' }}}
          </form>

          <div class="profile__container_data">
            <a class="profile__container_data-link" href="./changeData.hbs">Изменить данные</a>
            <a class="profile__container_data-link" href="./changePassword.hbs">Изменить пароль</a>
            <a class="profile__container_data-link" href="./registration.hbs">Выйти</a>
          </div>
        </div>
      </div>
    `;
  }
}
