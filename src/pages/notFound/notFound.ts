import '../../assets/styles/error.less';
import { Block } from '../../modules';

export default class NotFound extends Block {
  protected render(): string {
    return `
      <div class="error">
        <h1 class="error__title">404</h1>
        <h3 class="error__subtitle">Не туда попали</h3>

        {{{ Link href="/chat" text="Назад к чатам" }}}
      </div>
      `;
  }
}
