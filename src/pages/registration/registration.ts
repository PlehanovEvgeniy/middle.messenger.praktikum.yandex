import "../../assets/styles/authForm.less";
import { Block } from "../../modules";
import { getFormValues } from "../../helpers";
import { onSubmitValidation } from "../../helpers/validation";

export default class Registration extends Block {
  constructor() {
    const onSubmit = (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      onSubmitValidation(values, this.children);
      console.log("registration", values);
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
        <h2 class="auth__form_title">Регистрация</h2>

        <div class="auth__form_input">
          {{{ Input type="text" placeholder="example@example.ru" label="Почта" name="email" validation="email" }}}
          {{{ Input type="text" placeholder="ivanivanov" label="Логин" name="login" validation="login" }}}
          {{{ Input type="text" placeholder="Ivan" label="Имя" name="first_name" validation="first_name" }}}
          {{{ Input type="text" placeholder="Ivanov" label="Фамилия" name="second_name" validation="second_name" }}}
          {{{ Input type="tel" placeholder="+7-999-999-99-99" label="Телефон" name="phone" validation="phone" }}}
          {{{ Input type="password" placeholder="Пароль" label="Пароль" name="password" validation="newPassword" }}}
          {{{ Input type="password" placeholder="Пароль" label="Пароль (ещё раз)" name="password" validation="confirmPassword" }}}
        </div>

        <div class="auth__form_buttons">
          {{{ Button type="submit" text="Зарегистрироваться" }}}
          {{{ Link href="/login" text="Войти" }}}
        </div>

      </form>
    `;
  }
}
