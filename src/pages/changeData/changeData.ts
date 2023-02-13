import "../../assets/styles/profile.less";
import { Block } from "../../modules";
import { getAvatarFile, getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";
import { ApiUser } from "../../api";

import * as backArrowSvg from "../../assets/images/back-arrow.svg";

export default class ChangeData extends Block {
  constructor() {
    const { currentUser } = window.store.state;

    const onSubmit = async (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      const avatar = getAvatarFile();

      const hasError = onSubmitValidation(values, this.children);

      if (hasError) {
        return;
      }

      try {
        if (avatar) {
          console.log(avatar);
          const updateUserAvatar = await ApiUser.updateUserAvatar({
            avatar,
          });
          window.store.dispatch({
            currentUser: JSON.parse(updateUserAvatar.response),
          });
          console.log(window.store.state.currentUser);
        }

        const updateUser = await ApiUser.updateUserInfo({
          first_name: values.first_name,
          display_name: values.display_name,
          email: values.email,
          login: values.login,
          phone: values.phone,
          second_name: values.second_name,
        });

        window.store.dispatch({ currentUser: JSON.parse(updateUser.response) });

        window.router.go("/settings");
      } catch (error) {
        console.log(error);
      }
    };

    super({
      ...currentUser,
      backIcon: `<img src=${backArrowSvg} alt="Назад">`,
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
            {{{ Link href="/settings" className="profile__back_btn" node=backIcon }}}
          </div>
        </div>
        <div class="profile__container">
          {{{ ProfileAvatar src=avatar isEditable=true }}}
  
          <div class="profile__container_info">
            {{{ ProfileInput type='email' name='email' label='Почта' placeholder='pochta@yandex.ru' value=email }}}
            {{{ ProfileInput type='text' name='login' label='Логин' placeholder='ivanivanov' value=login }}}
            {{{ ProfileInput type='text' name='first_name' label='Имя' placeholder='Иван' value=first_name }}}
            {{{ ProfileInput type='text' name='second_name' label='Фамилия' placeholder='Иванов' value=second_name }}}
            {{{ ProfileInput type='text' name='display_name' label='Имя в чате' placeholder='Иван' value=display_name }}}
            {{{ ProfileInput type='tel' name='phone' label='Телефон' placeholder='+7-909-967-30-30' value=phone }}}
          </div>
   
          {{{ Button type="submit" text="Сохранить" }}}
        </div
       </form>
      `;
  }
}
