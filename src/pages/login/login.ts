import "../../assets/styles/authForm.less";
import { Block } from "../../modules";
import { getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";

export default class Login extends Block {
  constructor() {
    const onSubmit = (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      onSubmitValidation(values, this.children);
      console.log("login", values);
    };

    super({
      events: {
        submit: onSubmit,
      },
    });
  }

  protected render(): string {
    return `
      <form class="auth__form">
        <h2 class="auth__form_title">Вход</h2>
    
        <div class="auth__form_input">
          {{{ Input type="text" placeholder="Логин" name="login" validation="login" }}}
          {{{ Input type="text" placeholder="Пароль" name="password" validation="password" }}}
        </div>
    
        <div class="auth__form_buttons">
          {{{ Button text="Авторизоваться" type="submit" }}}
          {{{ NavLink href='#registration' text="Нет аккаунта?" }}}
        </div>
      </form>
    `;
  }
}
