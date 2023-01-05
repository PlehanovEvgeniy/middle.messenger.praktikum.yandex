import "../../assets/styles/profile.less";
import { Block } from "../../modules";
import { getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";

import * as backArrowSvg from "../../assets/images/back-arrow.svg";
import * as profilePng from "../../assets/images/profile.png";

export default class ChangeData extends Block {
  constructor() {
    const onSubmit = (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      onSubmitValidation(values, this.children);
      console.log("changeData", values);
    };

    super({
      events: {
        submit: onSubmit,
      },
    });
  }

  protected render(): string {
    return `
      <form class="profile">
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
  
          <div class="profile__container_info">
            {{{ ProfileInput type='email' name='email' label='Почта' placeholder='pochta@yandex.ru' validation="email" }}}
            {{{ ProfileInput type='text' name='login' label='Логин' placeholder='ivanivanov' validation="login" }}}
            {{{ ProfileInput type='text' name='name' label='Имя' placeholder='Иван' validation="first_name" }}}
            {{{ ProfileInput type='text' name='surname' label='Фамилия' placeholder='Иванов' validation="second_name" }}}
            {{{ ProfileInput type='text' name='chatName' label='Имя в чате' placeholder='Иван' validation="first_name" }}}
            {{{ ProfileInput type='tel' name='tel' label='Телефон' placeholder='+7-909-967-30-30'  validation="phone" }}}
          </div>
   
          {{{ Button type="submit" text="Сохранить" }}}
        </div
       </form>
      `;
  }
}
