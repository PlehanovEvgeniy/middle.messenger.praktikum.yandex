import "../../assets/styles/profile.less";
import { Block } from "../../modules";
import { apiAuth } from "../../api";
import * as backArrowSvg from "../../assets/images/back-arrow.svg";

export default class Profile extends Block {
  constructor() {
    const { currentUser } = window.store.state;

    const onLogout = async () => {
      await apiAuth.logout();
      window.store.dispatch({
        currentUser: null,
      });
      window.router.go("/");
    };

    super({
      ...currentUser,
      onLogout,
    });
  }

  protected render(): string {
    return `
      <div class="profile">
        <div class="profile__back">
          <div class="profile__back_icon">
            <img src=${backArrowSvg} alt="Назад"> 
            {{{ Link href="/chat" className="profile__back_btn" }}}
          </div>
        </div>

        <div class="profile__container">
          {{{ ProfileAvatar src=avatar }}}

          <h2 class="profile__container_title">{{first_name}}</h2>
          <form class="profile__container_info">
            {{{ ProfileInput type='email' name='email' label='Почта' placeholder='pochta@yandex.ru' disabled=true value=email }}}
            {{{ ProfileInput type='text' name='login' label='Логин' placeholder='ivanivanov' disabled=true value=login }}}
            {{{ ProfileInput type='text' name='first_name' label='Имя' placeholder='Иван' disabled=true value=first_name }}}
            {{{ ProfileInput type='text' name='second_name' label='Фамилия' placeholder='Иванов' disabled=true value=second_name }}}
            {{{ ProfileInput type='text' name='display_name' label='Имя в чате' placeholder='Иван' disabled=true value=display_name }}}
            {{{ ProfileInput type='tel' name='phone' label='Телефон' placeholder='+7-909-967-30-30' disabled=true value=phone }}}
          </form>

          <div class="profile__container_data">
            {{{ Link href="/settings" className="profile__container_data-link" text="Изменить данные" }}}
            {{{ Link href="/changePassword" className="profile__container_data-link" text="Изменить пароль" }}}
            {{{ Button type="button" className="profile__container_data-logout" text="Выйти" onClick=onLogout }}}
          </div>
        </div>
      </div>
    `;
  }
}
