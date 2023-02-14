import '../../assets/styles/authForm.less';
import { Block } from '../../modules';
import { getFormValues } from '../../helpers';
import { onSubmitValidation } from '../../helpers/validation';
import { apiAuth } from '../../api';

export default class Login extends Block {
  constructor() {
    const onSubmit = async (event: Event) => {
      event.preventDefault();

      const values = getFormValues();
      const hasError = onSubmitValidation(values, this.children);

      if (hasError) {
        return;
      }

      try {
        await apiAuth.login({ login: values.login, password: values.password });

        const responseUser = await apiAuth.getUser();

        window.store.dispatch({
          currentUser: JSON.parse(responseUser.response),
        });

        window.router.go('/messenger');
      } catch (error) {
        console.log(error);
      }
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
          {{{ Link href="/sign-up" text="Нет акаунта?" }}}
        </div>
      </form>
    `;
  }
}
