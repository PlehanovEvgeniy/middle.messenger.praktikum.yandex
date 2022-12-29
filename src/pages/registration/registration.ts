import "../../assets/styles/authForm.less";
import { Block } from "../../modules";

export default class Registration extends Block {
  protected render(): string {
    return `
      <form class="auth__form">
        <h2 class="auth__form_title">Регистрация</h2>

        <div class="auth__form_input">
          {{{ Input type="text" placeholder="example@example.ru" label="Почта" name="email" }}}
          {{{ Input type="text" placeholder="ivanivanov" label="Логин" name="login" }}}
          {{{ Input type="text" placeholder="Ivan" label="Имя" name="name" }}}
          {{{ Input type="text" placeholder="Ivanov" label="Фамилия" name="surname" }}}
          {{{ Input type="tel" placeholder="+7-999-999-99-99" label="Телефон" name="tel" }}}
          {{{ Input type="password" placeholder="Пароль" label="Пароль" name="password" }}}
          {{{ Input type="password" placeholder="Пароль" label="Пароль (ещё раз)" name="password" }}}
        </div>

        <div class="auth__form_buttons">
          {{{ Button text="Зарегистрироваться" }}}
          {{{ NavLink href='../pages/login.hbs' text="Войти" }}}
        </div>

      </form>
    `;
  }
}
