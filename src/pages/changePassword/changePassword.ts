import "../../assets/styles/profile.less";
import { Block } from "../../modules";

export default class ChangePassword extends Block {
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
            <img src="../../assets/images/profile.png" alt="Профиль">
          </div>

          <form class="profile__container_password">
            {{{ ProfileInput type='password' name='oldPassword' label='Старый пароль' placeholder='•••••••••' }}}
            {{{ ProfileInput type='password' name='newPassword' label='Новый пароль' placeholder='•••••••••••' }}}
            {{{ ProfileInput type='password' name='repeatPassword' label='Повторите новый пароль' placeholder='•••••••••••' }}}
          </form>

          {{{ Button text="Сохранить" }}}
        </div>
      </div>
    `;
  }
}
