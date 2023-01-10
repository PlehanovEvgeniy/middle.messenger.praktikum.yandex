import "../../assets/styles/profile.less";
import { Block } from "../../modules";
import { getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";

import * as backArrowSvg from "../../assets/images/back-arrow.svg";
import * as profilePng from "../../assets/images/profile.png";

export default class ChangePassword extends Block {
  constructor() {
    const onSubmit = (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      onSubmitValidation(values, this.children);
      console.log("changePassword", values);
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

          <div class="profile__container_password">
            {{{ ProfileInput type='password' name='oldPassword' label='Старый пароль' placeholder='•••••••••' validation="oldPassword" }}}
            {{{ ProfileInput type='password' name='newPassword' label='Новый пароль' placeholder='•••••••••••' validation="newPassword" }}}
            {{{ ProfileInput type='password' name='repeatPassword' label='Повторите новый пароль' placeholder='•••••••••••' validation="confirmPassword" }}}
          </div>

          {{{ Button type="submit" text="Сохранить" }}}
        </div>
      </form>
    `;
  }
}
