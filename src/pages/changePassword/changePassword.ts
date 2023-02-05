import "../../assets/styles/profile.less";
import { Block } from "../../modules";
import { getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";
import { ApiUser } from "../../api";

import * as backArrowSvg from "../../assets/images/back-arrow.svg";

export default class ChangePassword extends Block {
  constructor() {
    const { currentUser } = window.store.state;

    const onSubmit = async (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      const hasError = onSubmitValidation(values, this.children);

      if (hasError) {
        return;
      }

      try {
        const changePassword = await ApiUser.updateUserPassword({
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        });

        window.store.dispatch({
          currentUser: JSON.parse(changePassword.response),
        });
      } catch (error) {
        console.log(error);
      }
    };

    super({
      ...currentUser,
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
          {{{ Link href="/chat" }}}
              <img src=${backArrowSvg} alt="Назад">
            </a>
          </div>
        </div>

        <div class="profile__container">
          {{{ ProfileAvatar src=avatar }}}

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
