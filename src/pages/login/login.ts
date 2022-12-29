import "../../assets/styles/authForm.less";
import { Block } from "../../modules";

export default class Login extends Block {
  protected render(): string {
    return `
      <form class="auth__form">
        <h2 class="auth__form_title">Вход</h2>
    
        <div class="auth__form_input">
          {{{ Input type="text" placeholder="Логин" name="login" }}}
          {{{ Input type="text" placeholder="Пароль" name="password" }}}
        </div>
    
        <div class="auth__form_buttons">
          {{{ Button text="Авторизоваться" }}}
          {{{ NavLink href='../pages/registration.hbs' text="Нет аккаунта?"}}}
        </div>
    
    </form>
        `;
  }
}
